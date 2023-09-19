using Dominio.Interface;
using Shared.RepositoryShared;

namespace Dominio.Services
{
    public class UfService
    {
        private IUfRepository _ufRepository;

        public UfService(IUfRepository ufRepository)
        {
            _ufRepository = ufRepository;
        }

        public RepositoryResult GetAll()
        {
            try
            {
                var ufs = _ufRepository.GetAll();
                return RepositoryResult.AddDapper(ufs);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }

    }
}