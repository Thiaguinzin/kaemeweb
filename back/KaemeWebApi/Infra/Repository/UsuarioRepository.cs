using Dapper;
using Dominio.Interface;
using Dominio.Models.UsuarioModels;
using Infra.Context;

namespace Infra.Repository
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly DapperContext _context;

        public UsuarioRepository(DapperContext context)
        {
            _context = context;
        }

        public bool Create(Usuario usuario)
        {

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(usuario.Senha);

            var sql = $@"INSERT INTO usuario (login, senha, nome, perfil_id, data_criacao, ativo)
                        VALUES (@Login, @Senha, @Nome, @Perfil_Id, @Data_Criacao, @Ativo)";

            using (var connection = _context.CreateConnection())
            {

                var query = $@"select 1 from usuario where usuario.login = '{usuario.Login}'";
                var prosseguir = connection.Query<int>(query).FirstOrDefault();

                if (prosseguir != 1) {
		            var usuarioSql = new Usuario() 
                    {
                        Login = usuario.Login,
                        Senha = passwordHash,
                        Nome = usuario.Nome,
                        Perfil_Id = usuario.Perfil_Id,
                        Data_Criacao = usuario.Data_Criacao,
                        Ativo = usuario.Ativo,
                    };

                    int linhasAfetadas = connection.Execute(sql, usuarioSql);

                    if (linhasAfetadas > 0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }                    
                } else {
                    Console.Write("Login já existe");
                    return false;
                }

            }            
        }

        public async Task<List<Usuario>> GetAll()
        {
            var query = "SELECT * FROM USUARIO";

            using (var connection = _context.CreateConnection())
            {
                var usuarios = await connection.QueryAsync<Usuario>(query);
                return usuarios.ToList();
            }
        }

        public async Task<Usuario> GetUsuarioByLogin(string login)
        {
            var query = $"SELECT * FROM USUARIO WHERE USUARIO.LOGIN = '{login}'";

            using (var connection = _context.CreateConnection())
            {
                var usuario = await connection.QueryAsync<Usuario>(query);
                return usuario.FirstOrDefault();
            }
        }

        public List<Usuario> GetUsuarioBySearch(string? login, string? nome, string? perfil_id, bool? ativo)
        {
            var builder = new SqlBuilder();
            
            var selector = builder.AddTemplate($@"select 
                                                	*,
                                                	(select descricao from perfil where perfil.id = usuario.perfil_id) as perfil
                                                from usuario
                                                /**where**/
                                                order by data_criacao desc");

            if (!string.IsNullOrEmpty(login))
                builder.Where($"usuario.login like '%{login}%'");

            if (!string.IsNullOrEmpty(nome))
                builder.Where($"usuario.nome like '%{nome}%'");

            if (!string.IsNullOrEmpty(perfil_id))
                builder.Where($"usuario.perfil_id like '%{perfil_id}%'");

            if (ativo == true) {
                builder.Where($"usuario.ativo = 1");
            }

            if (ativo == false) {
                builder.Where($"usuario.ativo = 0");
            }      

            using (var connection = _context.CreateConnection())
            {   
                var usuarios = connection.Query<Usuario>(selector.RawSql, selector.Parameters);
                return usuarios.ToList();
            }
        }
    }
}