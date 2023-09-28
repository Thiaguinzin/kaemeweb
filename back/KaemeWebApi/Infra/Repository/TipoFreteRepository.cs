using Dapper;
using Dominio.Interface;
using Dominio.Models;
using Dominio.Models.UsuarioModels;
using Infra.Context;

namespace Infra.Repository
{
    public class TipoFreteRepository : ITipoFreteRepository
    {
        private readonly DapperContext _context;

        public TipoFreteRepository(DapperContext context)
        {
            _context = context;
        }

        public List<TipoFrete> GetAllAtivos()
        {
            var query = "SELECT * FROM tipo_frete where ativo = 1";

            using (var connection = _context.CreateConnection())
            {
                var tipo_fretes = connection.Query<TipoFrete>(query);
                return tipo_fretes.ToList();
            }
        }
    }
}