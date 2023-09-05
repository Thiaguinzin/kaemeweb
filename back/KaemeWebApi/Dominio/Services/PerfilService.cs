using Dominio.Interface;
using Shared.RepositoryShared;

namespace Dominio.Services
{
    public class PerfilService
    {
        private IPerfilRepository _perfilRepository;

        public PerfilService(IPerfilRepository perfilRepository)
        {
            _perfilRepository = perfilRepository;
        }

        public async Task<RepositoryResult> GetAllAtivos()
        {
            try
            {
                var perfis = await _perfilRepository.GetAllAtivos();
                return RepositoryResult.AddDapper(perfis);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }

    }
}