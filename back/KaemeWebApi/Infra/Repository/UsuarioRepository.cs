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
    }
}