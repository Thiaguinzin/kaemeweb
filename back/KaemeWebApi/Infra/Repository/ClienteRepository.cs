using Dapper;
using Dominio.Interface;
using Dominio.Models;
using Dominio.Models.UsuarioModels;
using Infra.Context;

namespace Infra.Repository
{
    public class ClienteRepository : IClienteRepository
    {
        private readonly DapperContext _context;

        public ClienteRepository(DapperContext context)
        {
            _context = context;
        }

        public bool Create(Cliente cliente)
        {
            var sql = "INSERT INTO cliente (nome, data_nasc, signo, cpf, telefone, email, instagram, meio_captacao, logradouro, numero, complemento, " +
                        " bairro, cidade, uf_id, sexo, data_criacao, criado_por) " +
                        " VALUES (@Nome, @DataNasc, @Signo, @CPF, @Telefone, @Email, @Instagram, @MeioCaptacao, @Logradouro, @Numero, @Complemento, " +
                        "  @Bairro, @Cidade, @UfId, @Sexo, @DataCriacao, @CriadoPor)";

            using (var connection = _context.CreateConnection())
            {
		        var clienteSql = new Cliente() 
                {
                    Nome = cliente.Nome,
                    DataNasc = cliente.DataNasc,
                    Signo = cliente.Signo,
                    CPF = cliente.CPF,
                    Telefone = cliente.Telefone,
                    Email = cliente.Email,
                    Instagram = cliente.Instagram,
                    MeioCaptacao = cliente.MeioCaptacao,
                    Logradouro = cliente.Logradouro,
                    Numero = cliente.Numero,
                    Complemento = cliente.Complemento,
                    Bairro = cliente.Bairro,
                    Cidade = cliente.Cidade,
                    UfId = cliente.UfId,
                    Sexo = cliente.Sexo,
                    DataCriacao = cliente.DataCriacao,
                    CriadoPor = cliente.CriadoPor
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

        public async Task<List<Perfil>> GetAllAtivos()
        {
            var query = "SELECT * FROM PERFIL WHERE PERFIL.ATIVO = 1";

            using (var connection = _context.CreateConnection())
            {
                var perfis = await connection.QueryAsync<Perfil>(query);
                return perfis.ToList();
            }
        }

    }
}