using Dominio.Models;

namespace Dominio.Interface
{
    public interface ITipoPecaRepository
    {
        bool Create(TipoPeca tipoPeca);
        bool Delete(int id);
        List<TipoPeca> GetAll();
        List<TipoPeca> GetAllAtivos();
    }
}