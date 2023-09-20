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

    }
}