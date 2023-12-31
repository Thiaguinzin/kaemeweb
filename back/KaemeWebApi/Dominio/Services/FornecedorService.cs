using Dominio.Interface;
using Dominio.Models;
using Shared.RepositoryShared;

namespace Dominio.Services
{
    public class FornecedorService
    {
        private IFornecedorRepository _fornecedorRepository;

        public FornecedorService(IFornecedorRepository fornecedorRepository)
        {
            _fornecedorRepository = fornecedorRepository;
        }

        public RepositoryResult Create(Fornecedor fornecedor)
        {
            try
            {
                var result = _fornecedorRepository.Create(fornecedor);
                return RepositoryResult.AddDapper(result);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }

        public RepositoryResult Update(Fornecedor fornecedor)
        {
            try
            {
                var result = _fornecedorRepository.Update(fornecedor);
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
                var result = _fornecedorRepository.Delete(id);
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
                var result = _fornecedorRepository.GetAll();
                return RepositoryResult.AddDapper(result);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }

        public RepositoryResult GetFornecedorById(int id)
        {
            try
            {
                var result = _fornecedorRepository.GetFornecedorById(id);
                return RepositoryResult.AddDapper(result);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }        

    }
}