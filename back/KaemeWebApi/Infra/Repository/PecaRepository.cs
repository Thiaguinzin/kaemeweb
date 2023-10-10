using Dapper;
using Dominio.Interface;
using Dominio.Models;
using Dominio.Models.UsuarioModels;
using Infra.Context;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Http.Extensions;

namespace Infra.Repository
{
    public class PecaRepository : IPecaRepository
    {
        private readonly DapperContext _context;

        public PecaRepository(DapperContext context)
        {
            _context = context;
        }

        public bool Create(Peca peca)
        {
            try
            {
                var sql = $@"INSERT INTO peca (codigo, descricao, valor_compra, valor_venda, quantidade, ativo, tipo_peca_id, fornecedor_id, observacao, data_criacao, criado_por)
                            VALUES (@Codigo, @Descricao, @Valor_Compra, @Valor_Venda, @Quantidade, @Ativo, @Tipo_Peca_Id, @Fornecedor_Id, @Observacao, @Data_Criacao, @Criado_Por)";

            using (var connection = _context.CreateConnection())
            {
		        var clienteSql = new Peca() 
                {
                    Codigo = peca.Codigo,
                    Descricao = peca.Descricao,
                    Valor_Compra = peca.Valor_Compra,
                    Valor_Venda = peca.Valor_Venda,
                    Quantidade = peca.Quantidade,
                    Ativo = peca.Ativo,
                    Tipo_Peca_Id = peca.Tipo_Peca_Id,
                    Fornecedor_Id = peca.Fornecedor_Id,
                    Observacao = peca.Observacao,
                    Data_Criacao = peca.Data_Criacao,
                    Criado_Por = peca.Criado_Por
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
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
                throw;
            }

        }

        public bool Update(Peca peca)
        {
            try
            {
                var sql = $@"UPDATE peca set
                            codigo = @Codigo, descricao = @Descricao, valor_compra = @Valor_Compra, valor_venda = @Valor_Venda, quantidade = @Quantidade,
                            tipo_peca_id = @Tipo_Peca_Id, fornecedor_id = @Fornecedor_Id, observacao = @Observacao, ativo = @Ativo
                            where peca.id = {peca.Id}";

                using (var connection = _context.CreateConnection())
                {
		            var clienteSql = new Peca() 
                    {
                        Codigo = peca.Codigo,
                        Descricao = peca.Descricao,
                        Valor_Compra = peca.Valor_Compra,
                        Valor_Venda = peca.Valor_Venda,
                        Quantidade = peca.Quantidade,
                        Tipo_Peca_Id = peca.Tipo_Peca_Id,
                        Fornecedor_Id = peca.Fornecedor_Id,
                        Observacao = peca.Observacao,
                        Ativo = peca.Ativo
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
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
                throw;
            }

        }

        public bool Delete(int id)
        {
            var query = $"UPDATE peca SET peca.ativo = 0 WHERE peca.id = {id}";

            using (var connection = _context.CreateConnection())
            {
                int linhasAfetadas = connection.Execute(query);

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

        public List<Fornecedor> GetAll()
        {
            var query = @"SELECT 
	                        fornecedor.*,
	                        tipo_frete.descricao as Tipo_Frete
                            FROM fornecedor
                        inner join tipo_frete on tipo_frete.id = fornecedor.tipo_frete_id";

            using (var connection = _context.CreateConnection())
            {
                var fornecedores = connection.Query<Fornecedor>(query);
                return fornecedores.ToList();
            }
        }

        public Peca GetPecaById(int id)
        {
            var query = $@"SELECT * FROM peca WHERE peca.id = {id}";

            using (var connection = _context.CreateConnection())
            {
                var fornecedor = connection.Query<Peca>(query);
                return fornecedor.FirstOrDefault();
            }
        }

        public List<Peca> GetTop100()
        {
            var query = $@"SELECT TOP 100 
                        	peca.*,
                        	tipo_peca.descricao as Tipo_Peca_Descricao,
                        	fornecedor.razao_social as Fornecedor
                        FROM peca
                        JOIN tipo_peca on tipo_peca.id = peca.tipo_peca_id
                        JOIN fornecedor on fornecedor.id = peca.fornecedor_id
                        order by peca.data_criacao, peca.ativo desc";

            using (var connection = _context.CreateConnection())
            {
                var peca = connection.Query<Peca>(query);
                return peca.ToList();
            }
        }

        public List<Peca> GetPecaBySearch(string? codigo, int? tipo_peca_id, int? fornecedor_id)
        {
            var builder = new SqlBuilder();
            
            var selector = builder.AddTemplate($@"select
                                                    peca.*,
                                                    tipo_peca.descricao as Tipo_Peca_Descricao,
                                                    fornecedor.razao_social as Fornecedor
                                                FROM peca
                                                JOIN tipo_peca on tipo_peca.id = peca.tipo_peca_id
                                                JOIN fornecedor on fornecedor.id = peca.fornecedor_id
                                                /**where**/
                                                order by peca.data_criacao, peca.ativo desc");

            if (!string.IsNullOrEmpty(codigo))
                builder.Where($"peca.codigo like '%{codigo}%'");

            if (tipo_peca_id > 0)
                builder.Where($"peca.tipo_peca_id = ${tipo_peca_id}");

            if (fornecedor_id > 0)
                builder.Where($"peca.fornecedor_id = ${fornecedor_id}");


            using (var connection = _context.CreateConnection())
            {   
                var peca = connection.Query<Peca>(selector.RawSql, selector.Parameters);
                return peca.ToList();
            }
        }
    }
}