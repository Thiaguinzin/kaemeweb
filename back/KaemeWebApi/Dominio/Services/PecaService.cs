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

        public RepositoryResult Update(Peca peca)
        {
            try
            {
                var result = _pecaRepository.Update(peca);
                return RepositoryResult.AddDapper(result);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }

        public RepositoryResult Delete(int id)
        {
            try
            {
                var result = _pecaRepository.Delete(id);
                return RepositoryResult.AddDapper(result);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }

        public RepositoryResult GetTop100()
        {
            try
            {
                var result = _pecaRepository.GetTop100();
                return RepositoryResult.AddDapper(result);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }

        public RepositoryResult GetPecaById(int id)
        {
            try
            {
                var result = _pecaRepository.GetPecaById(id);
                return RepositoryResult.AddDapper(result);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }           

    }
}