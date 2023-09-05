using Dapper;
using Dominio.Interface;
using Dominio.Models;
using Dominio.Models.UsuarioModels;
using Infra.Context;

namespace Infra.Repository
{
    public class PerfilRepository : IPerfilRepository
    {
        private readonly DapperContext _context;

        public PerfilRepository(DapperContext context)
        {
            _context = context;
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