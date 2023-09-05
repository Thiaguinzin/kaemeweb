using Dominio.Models;
using Dominio.Models.UsuarioModels;

namespace Dominio.Interface
{
    public interface IPerfilRepository
    {
        Task<List<Perfil>> GetAllAtivos();
    }
}