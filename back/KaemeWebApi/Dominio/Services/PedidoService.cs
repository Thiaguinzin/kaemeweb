using Dominio.Interface;
using Dominio.Models;
using Shared.RepositoryShared;

namespace Dominio.Services
{
    public class PedidoService
    {
        private IPedidoRepository _pedidoRepository;

        public PedidoService(IPedidoRepository pedidoRepository)
        {
            _pedidoRepository = pedidoRepository;
        }

        public RepositoryResult Create(PedidoCreate pedido)
        {
            try
            {
                var result = _pedidoRepository.Create(pedido);
                return RepositoryResult.AddDapper(result);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }        

    }
}