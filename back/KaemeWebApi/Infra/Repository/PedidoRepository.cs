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
                        var createPedidoSql = $@"INSERT INTO pedido (cliente_id, usuario_id, data_pedido, ativo, cancelado)
                                            VALUES (@Cliente_Id, @Usuario_Id, @Data_Pedido, @Ativo, @Cancelado)";

		                var pedidoSql = new Pedido()
                        {
                            Cliente_Id = pedido.Pedido.Cliente_Id,
                            Usuario_Id = pedido.Pedido.Usuario_Id,
                            Data_Pedido = pedido.Pedido.Data_Pedido,
                            Ativo = pedido.Pedido.Ativo,
                            Cancelado = pedido.Pedido.Cancelado,
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
                        var createPedidoCobrancaSql = $@"INSERT INTO pedido_cobranca (valor_total, valor_pedido, valor_pago, data_pagamento, tipo_pagamento_id, parcelas, pago, cancelado)
                                                    VALUES (@Valor_Total, @Valor_Pedido, @Valor_Pago, @Data_Pagamento, @Tipo_Pagamento_Id, @Parcelas, @Pago, @Cancelado)";

		                var pedidoCobrancaSql = new PedidoCobranca()
                        {
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

        
    }
}