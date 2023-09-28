using Dapper;
using Dominio.Interface;
using Dominio.Models;
using Dominio.Models.UsuarioModels;
using Infra.Context;

namespace Infra.Repository
{
    public class FornecedorRepository : IFornecedorRepository
    {
        private readonly DapperContext _context;

        public FornecedorRepository(DapperContext context)
        {
            _context = context;
        }

        public bool Create(Fornecedor fornecedor)
        {
            try
            {
                var sql = "INSERT INTO fornecedor (razao_social, logradouro, uf, cnpj, telefone, email, instagram, min_pedido_atacado, perc_desc_a_vista, tipo_frete_id, data_criacao, criado_por) " +
                        " VALUES (@Razao_Social, @Logradouro, @Uf, @Cnpj, @Telefone, @Email, @Instagram, @Min_Pedido_Atacado, @Perc_Desc_A_Vista, @Tipo_Frete_Id, @Data_Criacao, @Criado_Por)";

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
                    Tipo_Frete_Id = fornecedor.Tipo_Frete_Id,
                    Data_Criacao = fornecedor.Data_Criacao,
                    Criado_Por = fornecedor.Criado_Por
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

       
    }
}