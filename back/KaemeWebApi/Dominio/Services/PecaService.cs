using Dominio.Interface;
using Dominio.Models;
using Shared.RepositoryShared;

namespace Dominio.Services
{
    public class PecaService
    {
        private IPecaRepository _pecaRepository;

        public PecaService(IPecaRepository pecaRepository)
        {
            _pecaRepository = pecaRepository;
        }

        public RepositoryResult Create(Peca peca)
        {
            try
            {
                var result = _pecaRepository.Create(peca);
                return RepositoryResult.AddDapper(result);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }       

    }
}