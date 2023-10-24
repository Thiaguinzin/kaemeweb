using Dominio.Models;

namespace Dominio.Interface
{
    public interface IPecaRepository
    {
        bool Create(Peca peca);
        bool Update(Peca peca);
        bool Delete(int id);
        List<Peca> GetTop100();
        Peca GetPecaById(int id);
        List<Peca> GetPecaBySearch(string? codigo, int? tipo_peca_id, int? fornecedor_id, bool? com_estoque = false);
        Task<List<Peca>> GetPecasByNumPedido(int num_pedido);
    }
}