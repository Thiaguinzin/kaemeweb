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

        public Pedido Create(PedidoCreate pedido)
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
                        // var query = $@"select top 1 num_pedido from pedido where cliente_id = {pedido.Pedido.Cliente_Id} order by num_pedido desc";
                        var query = $@"select top 1 MAX(num_pedido) from pedido where cliente_id = {pedido.Pedido.Cliente_Id} group by pedido.num_pedido order by num_pedido desc";
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

                        var pedidoReturn = new Pedido();
                        var queryPedidoReturn = $@"select top 1 * from pedido where cliente_id = {pedido.Pedido.Cliente_Id} order by num_pedido desc";
                        pedidoReturn = connection.Query<Pedido>(queryPedidoReturn, transaction: tran).FirstOrDefault();

                        if (createPedido > 0 && countCreatePedidoPeca > 0 && createPedidoCobranca > 0 && countUpdateEstoque > 0) {
                            tran.Commit();
                            return pedidoReturn;
                        } else {
                            tran.Rollback();
                            return null;
                        }
                    }

                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
                throw;
            }

        }

        public async Task<bool> Delete(PedidoInformation pedido)
        {
            try
            {
                var countUpdateEstoque = 0;
                var countDeletePedidoPeca = 0;
                var countDeletePedidoCobranca = 0;
                var countDeletePedido = 0;

                var pedidoPecas = await GetPedidoPecaByNumPedido((int)pedido.Num_Pedido);

                using (var connection = _context.CreateConnection())
                {                    
                    connection.Open();
                    
                    using (var tran = connection.BeginTransaction()) 
                    { 

                        foreach (var pedidoPeca in pedidoPecas)
                        {
                            var repondoEstoqueSql = $@"update peca set quantidade = quantidade + (select quantidade from pedido_peca where num_pedido = {pedidoPeca.Num_Pedido} and pedido_peca.peca_id = {pedidoPeca.Peca_Id}) where peca.id = {pedidoPeca.Peca_Id}";
                            int repondoEstoque = await connection.ExecuteAsync(repondoEstoqueSql, transaction: tran);

                            if (repondoEstoque > 0)
                                countUpdateEstoque++;                           

                        }

                            // Deletando PEDIDO_PECA
                            var deletePedidoPecaSql = $@"delete pedido_peca where num_pedido = {pedido.Num_Pedido}";
                            int deletePedidoPeca = await connection.ExecuteAsync(deletePedidoPecaSql, transaction: tran);

                            if (deletePedidoPeca > 0)
                                countDeletePedidoPeca++;                             

                            // Deletando PEDIDO_COBRANCA
                            var deletePedidoCobrancaSql = $@"delete pedido_cobranca where num_pedido = {pedido.Num_Pedido}";
                            int deletePedidoCobranca = await connection.ExecuteAsync(deletePedidoCobrancaSql, transaction: tran);

                            if (deletePedidoCobranca > 0)
                                countDeletePedidoCobranca++;

                            // Deletando PEDIDO
                            var deletePedidoSql = $@"delete pedido where num_pedido = {pedido.Num_Pedido}";
                            int deletePedido = await connection.ExecuteAsync(deletePedidoSql, transaction: tran);

                            if (deletePedido > 0)
                                countDeletePedido++;


                        if (countUpdateEstoque > 0 && countDeletePedido > 0 && countDeletePedidoCobranca > 0 && countDeletePedidoPeca > 0) {
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
            }

        }

        public bool AtualizarPedidoCobranca(PedidoCobranca pedidoCobranca, bool baixar)
        {
            if (baixar) {
                var sql = $@"update pedido_cobranca set valor_pago = @Valor_Pago, data_pagamento = @Data_Pagamento, tipo_pagamento_id = @Tipo_Pagamento_Id, parcelas = @Parcelas, pago = @Pago where pedido_cobranca.num_pedido = {pedidoCobranca.Num_Pedido}";

                using (var connection = _context.CreateConnection())
                {
		            var clienteSql = new PedidoCobranca() 
                    {
                        Valor_Pago = pedidoCobranca.Valor_Pago,
                        Data_Pagamento = pedidoCobranca.Data_Pagamento,
                        Tipo_Pagamento_Id = pedidoCobranca.Tipo_Pagamento_Id,
                        Parcelas = pedidoCobranca.Parcelas,
                        Pago = true
                    };

                    int linhasAfetadas = connection.Execute(sql, clienteSql);

                    if (linhasAfetadas > 0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            } else {
                var sql = $@"update pedido_cobranca set cancelado = 1, pago = 0 where pedido_cobranca.num_pedido = {pedidoCobranca.Num_Pedido}";

                using (var connection = _context.CreateConnection())
                {
                    int linhasAfetadas = connection.Execute(sql);

                    if (linhasAfetadas > 0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
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

        public async Task<Pedido> GetPedidoByNumPedido(int num_pedido)
        {
            var query = $@"SELECT 
                                *,
                                (select cliente.nome from cliente where cliente.id = pedido.cliente_id) as cliente,
                                (select cliente.data_nasc from cliente where cliente.id = pedido.cliente_id) as data_nasc,
                                (select usuario.login from usuario where usuario.id = pedido.usuario_id) as usuario
                            FROM pedido WHERE pedido.num_pedido = {num_pedido}";

            using (var connection = _context.CreateConnection())
            {
                var pedido = await connection.QueryAsync<Pedido>(query);
                return pedido.FirstOrDefault();
            }            
        }

        public async Task<List<PedidoPeca>> GetPedidoPecaByNumPedido(int num_pedido)
        {
            var query = $@"SELECT DISTINCT
                        	*,
                        	(select peca.codigo from peca where peca.id = pedido_peca.peca_id) as peca_codigo
                        FROM pedido_peca WHERE pedido_peca.num_pedido = {num_pedido}";

            using (var connection = _context.CreateConnection())
            {
                var pedidoPeca = await connection.QueryAsync<PedidoPeca>(query);
                return pedidoPeca.ToList();
            }  
        }        

        public async Task<PedidoCobranca> GetPedidoCobrancaByNumPedido(int num_pedido)
        {
            var query = $@"SELECT * FROM pedido_cobranca WHERE pedido_cobranca.num_pedido = {num_pedido}";

            using (var connection = _context.CreateConnection())
            {
                var pedidoCobranca = await connection.QueryAsync<PedidoCobranca>(query);
                return pedidoCobranca.FirstOrDefault();
            }   
        }

        public List<PedidoInformation> GetTop100Pedidos()
        {
            
            var query = $@"select distinct top 100 
	                        pedido.*,
	                        (select cliente.nome from cliente where cliente.id = pedido.cliente_id) as cliente,
	                        (select usuario.login from usuario where usuario.id = pedido.usuario_id) as funcionario,
	                        pedido_cobranca.valor_pedido,
	                        pedido_cobranca.valor_pago,
	                        (select tipo_pagamento.codigo from tipo_pagamento where tipo_pagamento.id = pedido_cobranca.tipo_pagamento_id) as tipo_pagamento,
	                        (select status_pedido.codigo from status_pedido where status_pedido.id = pedido.status_pedido_id) as status_pedido,
                            pedido_cobranca.pago
                        from pedido
                        inner join pedido_peca on pedido_peca.num_pedido = pedido.num_pedido
                        inner join pedido_cobranca on pedido_cobranca.num_pedido = pedido.num_pedido
                        order by data_pedido desc";

            using (var connection = _context.CreateConnection())
            {
                var pedidos = connection.Query<PedidoInformation>(query);
                return pedidos.ToList();
            }   
        }

        public List<PedidoInformation> GetPedidoCliente(int num_pedido, string cpf)
        {
            var query = $@"select * from
                            (select 
                            	pedido.num_pedido,
                            	(select usuario.nome from usuario where usuario.id = pedido.usuario_id) as funcionario,
                            	pedido.data_pedido,
                            	pedido_peca.id as pedido_peca_id,
                            	(select peca.codigo from peca where peca.id = pedido_peca.peca_id) as peca_codigo,
                            	pedido_peca.quantidade,
                            	pedido_peca.valor_peca,
                            	pedido.cancelado,
                            	pedido_cobranca.valor_pago,
                                pedido_cobranca.valor_total,
                                pedido_cobranca.valor_pedido,
                            	pedido_cobranca.data_pagamento,
                            	(select descricao from tipo_pagamento where tipo_pagamento.id = pedido_cobranca.tipo_pagamento_id) as tipo_pagamento,
                            	(select descricao from status_pedido where status_pedido.id = pedido.status_pedido_id) as status_pedido

                            from pedido
                            inner join cliente on cliente.id = pedido.cliente_id
                            inner join pedido_peca on pedido_peca.num_pedido = pedido.num_pedido
                            inner join pedido_cobranca on pedido_cobranca.num_pedido = pedido.num_pedido

                            where pedido.num_pedido = {num_pedido} and cliente.cpf = '{cpf}')q

                            order by q.peca_codigo asc";

            using (var connection = _context.CreateConnection())
            {
                var pedido = connection.Query<PedidoInformation>(query);
                return pedido.ToList();
            } 
        }

        public bool AtualizarStatusPedido(int num_pedido, int status_pedido_id)
        {
            var sql = $@"update pedido set status_pedido_id = {status_pedido_id} where num_pedido = {num_pedido}";

            using (var connection = _context.CreateConnection())
            {
                int linhasAfetadas = connection.Execute(sql);
                
                if (linhasAfetadas > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }            
        }

        public List<PedidoInformation> GetHistoricoPedido(PedidoSearch pedidoSearch)
        {
            var builder = new SqlBuilder();

            var selector = builder.AddTemplate($@"SET LANGUAGE 'English';
                            select
                            	*,

                            	CASE
                                    WHEN q.RowNum = 1 THEN valor_pago_aux
                                ELSE 0
                                END AS valor_pago,

                            	CASE
                                    WHEN q.RowNum = 1 THEN valor_pedido_aux
                                ELSE 0
                                END AS valor_pedido                                

                            from
                            (select
                            	pedido.num_pedido,
                            	pedido.data_pedido,
                            	usuario.nome as funcionario,
                            	cliente.nome as cliente,
                            	status_pedido.codigo as status_pedido,
                            	peca.codigo as peca_codigo,
                            	tipo_peca.descricao as tipo_peca,
                            	pedido_peca.quantidade,
                            	(valor_peca * pedido_peca.quantidade) as valor_peca,
                            	pedido_cobranca.valor_pedido as valor_pedido_aux,
                            	pedido_cobranca.valor_pago as valor_pago_aux,
                            	data_pagamento,
                            	pedido.cancelado,
                            	ROW_NUMBER() OVER (PARTITION BY pedido.num_pedido ORDER BY peca.codigo) AS RowNum

                            from pedido
                            join cliente on cliente.id = pedido.cliente_id
                            join status_pedido on status_pedido.id = pedido.status_pedido_id
                            join usuario on usuario.id = pedido.usuario_id
                            join pedido_peca on pedido_peca.num_pedido = pedido.num_pedido
                            join peca on peca.id = pedido_peca.peca_id
                            join tipo_peca on tipo_peca.id = peca.tipo_peca_id
                            join pedido_cobranca on pedido_cobranca.num_pedido = pedido.num_pedido
                            join tipo_pagamento on tipo_pagamento.id = pedido_cobranca.tipo_pagamento_id

                            /**where**/
                            )as q

                            order by data_pedido asc");

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

            if (!string.IsNullOrEmpty(pedidoSearch.Cliente_Id))
                builder.Where($"pedido.cliente_id = {pedidoSearch.Cliente_Id}");

            if (!string.IsNullOrEmpty(pedidoSearch.Usuario_Id))
                builder.Where($"pedido.usuario_id = {pedidoSearch.Usuario_Id}");

            using (var connection = _context.CreateConnection())
            {   
                var pedidos = connection.Query<PedidoInformation>(selector.RawSql, selector.Parameters);
                return pedidos.ToList();
            }            

        }
    }
}