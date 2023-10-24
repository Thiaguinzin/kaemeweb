using Dominio.Models;
using Dominio.Models.UsuarioModels;

namespace Dominio.Interface
{
    public interface IPedidoRepository
    {
        bool Create(PedidoCreate pedido);
        bool AtualizarPedidoCobranca(PedidoCobranca pedidoCobranca, bool baixar);
        List<PedidoInformation> GetPedidoBySearch(PedidoSearch pedidoSearch);
        Task<Pedido> GetPedidoByNumPedido(int num_pedido);
        Task<List<PedidoPeca>> GetPedidoPecaByNumPedido(int num_pedido);
        Task<PedidoCobranca> GetPedidoCobrancaByNumPedido(int num_pedido);
        List<PedidoInformation> GetTop100Pedidos();
    }
}