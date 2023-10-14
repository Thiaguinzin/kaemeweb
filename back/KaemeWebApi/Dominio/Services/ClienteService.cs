using Dominio.Interface;
using Dominio.Models;
using Shared.RepositoryShared;

namespace Dominio.Services
{
    public class ClienteService
    {
        private IClienteRepository _clienteRepository;

        public ClienteService(IClienteRepository clienteRepository)
        {
            _clienteRepository = clienteRepository;
        }

        public RepositoryResult Create(Cliente cliente)
        {
            try
            {
                var result = _clienteRepository.Create(cliente);
                return RepositoryResult.AddDapper(result);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }

        public RepositoryResult Update(Cliente cliente)
        {
            try
            {
                var result = _clienteRepository.Update(cliente);
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
                var result = _clienteRepository.Delete(id);
                return RepositoryResult.AddDapper(result);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }           

        public async Task<RepositoryResult> GetAllTop()
        {
            try
            {
                var result = await _clienteRepository.GetAllTop();
                return RepositoryResult.AddDapper(result);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }

        public async Task<RepositoryResult> GetClienteById(int id)
        {
            try
            {
                var result = await _clienteRepository.GetClienteById(id);
                return RepositoryResult.AddDapper(result);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }

        public RepositoryResult GetClienteBySearch(string? nome, string? cpf)
        {
            try
            {
                var result = _clienteRepository.GetClienteBySearch(nome, cpf);
                return RepositoryResult.AddDapper(result);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }         

    }
}