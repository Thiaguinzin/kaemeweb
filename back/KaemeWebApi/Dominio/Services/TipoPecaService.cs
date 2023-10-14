using Dominio.Interface;
using Dominio.Models;
using Shared.RepositoryShared;

namespace Dominio.Services
{
    public class TipoPecaService
    {
        private ITipoPecaRepository _tipoPecaRepository;

        public TipoPecaService(ITipoPecaRepository tipoPecaRepository)
        {
            _tipoPecaRepository = tipoPecaRepository;
        }

        public RepositoryResult Create(TipoPeca tipoPeca)
        {
            try
            {
                var result = _tipoPecaRepository.Create(tipoPeca);
                return RepositoryResult.AddDapper(result);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }

        public RepositoryResult Update(TipoPeca tipoPeca)
        {
            try
            {
                var result = _tipoPecaRepository.Update(tipoPeca);
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
                var result = _tipoPecaRepository.Delete(id);
                return RepositoryResult.AddDapper(result);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }         

        public RepositoryResult GetAll()
        {
            try
            {
                var result = _tipoPecaRepository.GetAll();
                return RepositoryResult.AddDapper(result);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }

        public RepositoryResult GetAllAtivos()
        {
            try
            {
                var result = _tipoPecaRepository.GetAllAtivos();
                return RepositoryResult.AddDapper(result);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }        

    }
}