using Dominio.Models;

namespace Dominio.Interface
{
    public interface ITipoFreteRepository
    {
        List<TipoFrete> GetAllAtivos();
    }
}