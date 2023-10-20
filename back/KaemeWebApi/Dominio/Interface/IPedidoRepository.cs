using Dominio.Models;
using Dominio.Models.UsuarioModels;

namespace Dominio.Interface
{
    public interface IPedidoRepository
    {
        bool Create(PedidoCreate pedido);
        List<PedidoInformation> GetPedidoBySearch(PedidoSearch pedidoSearch);
    }
}