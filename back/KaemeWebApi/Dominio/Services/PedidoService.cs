using Dominio.Interface;
using Dominio.Models;
using Shared.RepositoryShared;

namespace Dominio.Services
{
    public class PedidoService
    {
        private IPedidoRepository _pedidoRepository;
        private IPecaRepository _pecaRepository;

        public PedidoService(IPedidoRepository pedidoRepository, IPecaRepository pecaRepository)
        {
            _pedidoRepository = pedidoRepository;
            _pecaRepository = pecaRepository;
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

        public RepositoryResult AtualizarPedidoCobranca(PedidoCobranca pedidoCobranca, bool baixar)
        {
            try
            {
                var result = _pedidoRepository.AtualizarPedidoCobranca(pedidoCobranca, baixar);
                return RepositoryResult.AddDapper(result);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }        

        public RepositoryResult GetPedidoBySearch(PedidoSearch pedidoSearch)
        {
            try
            {
                var result = _pedidoRepository.GetPedidoBySearch(pedidoSearch);
                return RepositoryResult.AddDapper(result);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }

        public async Task<RepositoryResult> GetPedidoByNumPedido(int num_pedido)
        {
            try
            {
                PedidoCreate pedidoCreate = new PedidoCreate();

                var pedido = await _pedidoRepository.GetPedidoByNumPedido(num_pedido);
                var pedidoPeca = await _pedidoRepository.GetPedidoPecaByNumPedido(num_pedido);
                var pedidoCobranca = await _pedidoRepository.GetPedidoCobrancaByNumPedido(num_pedido);
                var pecasReturn = await _pecaRepository.GetPecasByNumPedido(num_pedido);


                pedidoCreate.Pedido = pedido;
                pedidoCreate.Pecas = pedidoPeca;
                pedidoCreate.Pedido_Cobranca = pedidoCobranca;
                pedidoCreate.PecasReturn = pecasReturn;


                return RepositoryResult.AddDapper(pedidoCreate);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }

        public RepositoryResult GetTop100Pedidos()
        {
            try
            {
                var result = _pedidoRepository.GetTop100Pedidos();
                return RepositoryResult.AddDapper(result);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }

    }
}