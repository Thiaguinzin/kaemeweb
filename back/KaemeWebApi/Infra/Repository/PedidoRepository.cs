using Dapper;
using Dominio.Interface;
using Dominio.Models;
using Dominio.Models.UsuarioModels;
using Infra.Context;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Http.Extensions;

namespace Infra.Repository
{
    public class PedidoRepository : IPedidoRepository
    {
        private readonly DapperContext _context;

        public PedidoRepository(DapperContext context)
        {
            _context = context;
        }

        public bool Create(PedidoCreate pedido)
        {
            try
            {
                var countCreatePedidoPeca = 0;
                var countUpdateEstoque = 0;

                using (var connection = _context.CreateConnection())
                {                    
                    connection.Open();
                    
                    using (var tran = connection.BeginTransaction()) 
                    { 
                        // Criando Pedido
                        var createPedidoSql = $@"INSERT INTO pedido (cliente_id, usuario_id, data_pedido, ativo, cancelado, status_pedido_id)
                                            VALUES (@Cliente_Id, @Usuario_Id, @Data_Pedido, @Ativo, @Cancelado, @Status_Pedido_Id)";

		                var pedidoSql = new Pedido()
                        {
                            Cliente_Id = pedido.Pedido.Cliente_Id,
                            Usuario_Id = pedido.Pedido.Usuario_Id,
                            Data_Pedido = pedido.Pedido.Data_Pedido,
                            Ativo = pedido.Pedido.Ativo,
                            Cancelado = pedido.Pedido.Cancelado,
                            Status_Pedido_Id = pedido.Pedido.Status_Pedido_Id
                        };

                        int createPedido = connection.Execute(createPedidoSql, pedidoSql, transaction: tran);

                        // Criando Pedido Peca
                        var query = $@"select top 1 num_pedido from pedido where cliente_id = {pedido.Pedido.Cliente_Id} order by data_pedido desc";
                        var num_pedido = connection.Query<int>(query, transaction: tran).FirstOrDefault();

                        foreach (var peca in pedido.Pecas)
                        {
                            var createPedidoPecaSql = $@"INSERT INTO pedido_peca (num_pedido, quantidade, peca_id, valor_peca)
                                                    VALUES (@Num_Pedido, @Quantidade, @Peca_Id, @Valor_Peca)";

		                    var pedidoPecaSql = new PedidoPeca()
                            {
                                Num_Pedido = num_pedido,
                                Quantidade = peca.Quantidade,
                                Peca_Id = peca.Peca_Id,
                                Valor_Peca = peca.Valor_Peca
                            };

                            int createPedidoPeca = connection.Execute(createPedidoPecaSql, pedidoPecaSql, transaction: tran);

                            if (createPedidoPeca > 0)
                                countCreatePedidoPeca++;

                            var updateEstoqueSql = $@"update peca set quantidade = (select quantidade - {peca.Quantidade} 
                                                    from peca where peca.id = {peca.Peca_Id}) where peca.id = {peca.Peca_Id}";
                            
                            int updateEstoque = connection.Execute(updateEstoqueSql, transaction: tran);

                            if (updateEstoque > 0)
                                countUpdateEstoque++;

                        }

                        // Criando Pedido Cobranca
                        var createPedidoCobrancaSql = $@"INSERT INTO pedido_cobranca (num_pedido,valor_total, valor_pedido, valor_pago, data_pagamento, tipo_pagamento_id, parcelas, pago, cancelado)
                                                    VALUES (@Num_Pedido, @Valor_Total, @Valor_Pedido, @Valor_Pago, @Data_Pagamento, @Tipo_Pagamento_Id, @Parcelas, @Pago, @Cancelado)";

		                var pedidoCobrancaSql = new PedidoCobranca()
                        {
                            Num_Pedido = num_pedido,
                            Valor_Total = pedido.Pedido_Cobranca.Valor_Total,
                            Valor_Pedido = pedido.Pedido_Cobranca.Valor_Pedido,
                            Valor_Pago = pedido.Pedido_Cobranca.Valor_Pago,
                            Data_Pagamento = pedido.Pedido_Cobranca.Data_Pagamento,
                            Tipo_Pagamento_Id = pedido.Pedido_Cobranca.Tipo_Pagamento_Id,
                            Parcelas = pedido.Pedido_Cobranca.Parcelas,
                            Pago = pedido.Pedido_Cobranca.Pago,
                            Cancelado = pedido.Pedido_Cobranca.Cancelado
                        };

                        int createPedidoCobranca = connection.Execute(createPedidoCobrancaSql, pedidoCobrancaSql, transaction: tran);

                        if (createPedido > 0 && countCreatePedidoPeca > 0 && createPedidoCobranca > 0 && countUpdateEstoque > 0) {
                            tran.Commit();
                            return true;
                        } else {
                            tran.Rollback();
                            return false;
                        }
                    }

                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
                throw;
            }

        }

        public List<PedidoInformation> GetPedidoBySearch(PedidoSearch pedidoSearch)
        {
            var builder = new SqlBuilder();

            var selector = builder.AddTemplate($@"SET LANGUAGE 'English';
                                                    select distinct
	                                                pedido.*,
	                                                (select usuario.login from usuario where usuario.id = pedido.usuario_id) as Funcionario,
	                                                (select cliente.nome from cliente where cliente.id = pedido.cliente_id) as Cliente,
	                                                (select status_pedido.codigo from status_pedido where status_pedido.id = status_pedido_id) as Status_Pedido,
	                                                pedido_cobranca.valor_total,
	                                                pedido_cobranca.valor_pedido,
	                                                pedido_cobranca.valor_pago,
	                                                pedido_cobranca.data_pagamento,
	                                                (select tipo_pagamento.codigo from tipo_pagamento where tipo_pagamento.id = pedido_cobranca.tipo_pagamento_id) as Tipo_Pagamento,
	                                                pedido_cobranca.parcelas,
	                                                pedido_cobranca.pago
                                                from pedido
                                                inner join pedido_peca on pedido_peca.num_pedido = pedido.num_pedido
                                                inner join pedido_cobranca on pedido_cobranca.id = pedido.num_pedido
                                                /**where**/
                                                order by data_pedido desc");

            if (!string.IsNullOrEmpty(pedidoSearch.Num_Pedido))
                builder.Where($"pedido.num_pedido = {pedidoSearch.Num_Pedido}");

            if (!string.IsNullOrEmpty(pedidoSearch.Cliente_Id))
                builder.Where($"pedido.cliente_id = {pedidoSearch.Cliente_Id}");

            if (pedidoSearch.Data_Inicio_Pedido != null && pedidoSearch.Data_Fim_Pedido != null) {
                string dataInicioPedido = pedidoSearch.Data_Inicio_Pedido?.ToString("yyyy-MM-dd HH:mm:ss");
                string dataFimPedido = pedidoSearch.Data_Fim_Pedido?.ToString("yyyy-MM-dd HH:mm:ss");

                builder.Where($"pedido.data_pedido BETWEEN '{dataInicioPedido}' and '{dataFimPedido}'");
            }

            if (pedidoSearch.Data_Inicio_Pagamento != null && pedidoSearch.Data_Fim_Pagamento != null) {
                string dataInicioPagamento = pedidoSearch.Data_Inicio_Pagamento?.ToString("yyyy-MM-dd HH:mm:ss");
                string dataFimPagamento = pedidoSearch.Data_Fim_Pagamento?.ToString("yyyy-MM-dd HH:mm:ss");

                builder.Where($"pedido_cobranca.data_pagamento BETWEEN '{dataInicioPagamento}' and '{dataFimPagamento}'");
            }

            if (!string.IsNullOrEmpty(pedidoSearch.Status_Pedido_Id))
                builder.Where($"pedido.status_pedido_id = {pedidoSearch.Status_Pedido_Id}");

            if (pedidoSearch.Pago == true) {
                builder.Where($"pedido_cobranca.pago = 1");
            }

            if (pedidoSearch.Pago == false) {
                builder.Where($"pedido_cobranca.pago = 0");
            }

            if (!string.IsNullOrEmpty(pedidoSearch.Tipo_Pagamento_Id))
                builder.Where($"pedido_cobranca.tipo_pagamento_id = {pedidoSearch.Tipo_Pagamento_Id}");



            using (var connection = _context.CreateConnection())
            {   
                var pedidos = connection.Query<PedidoInformation>(selector.RawSql, selector.Parameters);
                return pedidos.ToList();
            }
        }
    }
}