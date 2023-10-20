using Dominio.Models;

namespace Dominio.Interface
{
    public interface IStatusPedidoRepository
    {
        List<StatusPedido> GetAllAtivos();
    }
}