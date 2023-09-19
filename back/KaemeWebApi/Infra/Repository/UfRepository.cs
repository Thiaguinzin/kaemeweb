using Dapper;
using Dominio.Interface;
using Dominio.Models;
using Dominio.Models.UsuarioModels;
using Infra.Context;

namespace Infra.Repository
{
    public class UfRepository : IUfRepository
    {
        private readonly DapperContext _context;

        public UfRepository(DapperContext context)
        {
            _context = context;
        }

        public List<Uf> GetAll()
        {
            var query = "SELECT * FROM UF";

            using (var connection = _context.CreateConnection())
            {
                var ufs = connection.Query<Uf>(query);
                return ufs.ToList();
            }
        }


    }
}