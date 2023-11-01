using Dominio.Models;
using Dominio.Models.UsuarioModels;

namespace Dominio.Interface
{
    public interface IPedidoRepository
    {
        Pedido Create(PedidoCreate pedido);
        Task<bool> Delete(PedidoInformation pedido);
        bool AtualizarPedidoCobranca(PedidoCobranca pedidoCobranca, bool baixar);
        bool AtualizarStatusPedido(int num_pedido, int status_pedido_id);
        List<PedidoInformation> GetPedidoBySearch(PedidoSearch pedidoSearch);
        Task<Pedido> GetPedidoByNumPedido(int num_pedido);
        Task<List<PedidoPeca>> GetPedidoPecaByNumPedido(int num_pedido);
        Task<PedidoCobranca> GetPedidoCobrancaByNumPedido(int num_pedido);
        List<PedidoInformation> GetTop100Pedidos();
        List<PedidoInformation> GetPedidoCliente(int num_pedido, string cpf);
    }
}