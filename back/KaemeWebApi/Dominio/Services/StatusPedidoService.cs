using Dominio.Interface;
using Shared.RepositoryShared;

namespace Dominio.Services
{
    public class StatusPedidoService
    {
        private IStatusPedidoRepository _statusPedidoRepository;

        public StatusPedidoService(IStatusPedidoRepository statusPedidoRepository)
        {
            _statusPedidoRepository = statusPedidoRepository;
        }

        public RepositoryResult GetAllAtivos()
        {
            try
            {
                var status_pedido = _statusPedidoRepository.GetAllAtivos();
                return RepositoryResult.AddDapper(status_pedido);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }

    }
}