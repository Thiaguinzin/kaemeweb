using Dominio.Interface;
using Shared.RepositoryShared;

namespace Dominio.Services
{
    public class TipoFreteService
    {
        private ITipoFreteRepository _tipoFreteRepository;

        public TipoFreteService(ITipoFreteRepository tipoFreteRepository)
        {
            _tipoFreteRepository = tipoFreteRepository;
        }

        public RepositoryResult GetAllAtivos()
        {
            try
            {
                var tipo_fretes = _tipoFreteRepository.GetAllAtivos();
                return RepositoryResult.AddDapper(tipo_fretes);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }

    }
}