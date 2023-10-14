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
            var sql = "INSERT INTO cliente (nome, data_nasc, signo, cpf, telefone, email, instagram, meio_captacao, cep, logradouro, numero, complemento, " +
                        " bairro, cidade, uf, sexo, data_criacao, criado_por) " +
                        " VALUES (@Nome, @Data_Nasc, @Signo, @CPF, @Telefone, @Email, @Instagram, @Meio_Captacao, @CEP, @Logradouro, @Numero, @Complemento, " +
                        "  @Bairro, @Cidade, @Uf, @Sexo, @Data_Criacao, @Criado_Por)";

            using (var connection = _context.CreateConnection())
            {
		        var clienteSql = new Cliente() 
                {
                    Nome = cliente.Nome,
                    Data_Nasc = cliente.Data_Nasc,
                    Signo = cliente.Signo,
                    CPF = cliente.CPF,
                    Telefone = cliente.Telefone,
                    Email = cliente.Email,
                    Instagram = cliente.Instagram,
                    Meio_Captacao = cliente.Meio_Captacao,
                    CEP = cliente.CEP,
                    Logradouro = cliente.Logradouro,
                    Numero = cliente.Numero,
                    Complemento = cliente.Complemento,
                    Bairro = cliente.Bairro,
                    Cidade = cliente.Cidade,
                    Uf = cliente.Uf,
                    Sexo = cliente.Sexo,
                    Data_Criacao = cliente.Data_Criacao,
                    Criado_Por = cliente.Criado_Por
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

        public bool Update(Cliente cliente)
        {
            var sql = "UPDATE cliente SET nome = @Nome, data_nasc = @Data_Nasc, signo = @Signo, cpf = @CPF, telefone = @Telefone, email = @Email, " +
                        " instagram = @Instagram, meio_captacao = @Meio_Captacao, cep = @CEP, logradouro = @Logradouro, numero = @Numero, complemento = @Complemento, " +
                        " bairro = @Bairro, cidade = @Cidade, uf = @Uf, sexo = @Sexo, data_criacao = @Data_Criacao, criado_por = @Criado_Por " +
                        $" WHERE CLIENTE.ID = {cliente.Id}";

            using (var connection = _context.CreateConnection())
            {
		        var clienteSql = new Cliente() 
                {
                    Nome = cliente.Nome,
                    Data_Nasc = cliente.Data_Nasc,
                    Signo = cliente.Signo,
                    CPF = cliente.CPF,
                    Telefone = cliente.Telefone,
                    Email = cliente.Email,
                    Instagram = cliente.Instagram,
                    Meio_Captacao = cliente.Meio_Captacao,
                    CEP = cliente.CEP,
                    Logradouro = cliente.Logradouro,
                    Numero = cliente.Numero,
                    Complemento = cliente.Complemento,
                    Bairro = cliente.Bairro,
                    Cidade = cliente.Cidade,
                    Uf = cliente.Uf,
                    Sexo = cliente.Sexo,
                    Data_Criacao = cliente.Data_Criacao,
                    Criado_Por = cliente.Criado_Por
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

        public bool Delete(int id)
        {
            var query = $"DELETE CLIENTE WHERE CLIENTE.ID = {id}";

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

        public async Task<List<Cliente>> GetAllTop()
        {
            var query = "SELECT TOP 5 * FROM CLIENTE";

            using (var connection = _context.CreateConnection())
            {
                var clientes = await connection.QueryAsync<Cliente>(query);
                return clientes.ToList();
            }
        }

        public async Task<Cliente> GetClienteById(int id)
        {
            var query = $"SELECT DISTINCT * FROM CLIENTE WHERE CLIENTE.ID = '{id}'";

            using (var connection = _context.CreateConnection())
            {
                var cliente = await connection.QueryAsync<Cliente>(query);
                return cliente.FirstOrDefault();
            }
        }

        public List<Cliente> GetClienteBySearch(string? nome, string? cpf)
        {
            var builder = new SqlBuilder();
            
            var selector = builder.AddTemplate($@"select * FROM cliente
                                                /**where**/
                                                order by cliente.data_criacao desc");

            if (!string.IsNullOrEmpty(nome))
                builder.Where($"cliente.nome like '%{nome}%'");

            if (!string.IsNullOrEmpty(cpf))
                builder.Where($"cliente.cpf like '%{cpf}%'");    

            using (var connection = _context.CreateConnection())
            {   
                var cliente = connection.Query<Cliente>(selector.RawSql, selector.Parameters);
                return cliente.ToList();
            }
        }
    }
}