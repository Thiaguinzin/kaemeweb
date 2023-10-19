using Dominio.Models;

namespace Dominio.Interface
{
    public interface ITipoPagamentoRepository
    {
        List<TipoPagamento> GetAllAtivos();
    }
}