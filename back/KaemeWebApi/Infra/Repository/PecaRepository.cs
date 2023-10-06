using Dapper;
using Dominio.Interface;
using Dominio.Models;
using Dominio.Models.UsuarioModels;
using Infra.Context;

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

        public bool Update(Fornecedor fornecedor)
        {
            try
            {
                var sql = $@"UPDATE fornecedor set
                            razao_social = @Razao_Social, logradouro = @Logradouro, uf = @Uf, cnpj = @Cnpj, telefone = @Telefone, email = @Email,
                            instagram = @Instagram, min_pedido_atacado = @Min_Pedido_Atacado, perc_desc_a_vista = @Perc_Desc_A_Vista, tipo_frete_id = @Tipo_Frete_Id
                            where fornecedor.id = {fornecedor.Id}";

                using (var connection = _context.CreateConnection())
                {
		            var clienteSql = new Fornecedor() 
                    {
                        Razao_Social = fornecedor.Razao_Social,
                        Logradouro = fornecedor.Logradouro,
                        Uf = fornecedor.Uf,
                        Cnpj = fornecedor.Cnpj,
                        Telefone = fornecedor.Telefone,
                        Email = fornecedor.Email,
                        Instagram = fornecedor.Instagram,
                        Min_Pedido_Atacado = fornecedor.Min_Pedido_Atacado,
                        Perc_Desc_A_Vista = fornecedor.Perc_Desc_A_Vista,
                        Tipo_Frete_Id = fornecedor.Tipo_Frete_Id
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
            var query = $"DELETE fornecedor WHERE fornecedor.id = {id}";

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

        public Fornecedor GetFornecedorById(int id)
        {
            var query = $@"SELECT * FROM fornecedor WHERE fornecedor.id = {id}";

            using (var connection = _context.CreateConnection())
            {
                var fornecedor = connection.Query<Fornecedor>(query);
                return fornecedor.FirstOrDefault();
            }
        }
    }
}