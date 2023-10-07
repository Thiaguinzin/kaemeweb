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
        // Peca GetPecaBySearch(Peca peca);
    }
}