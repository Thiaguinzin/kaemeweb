using Dominio.Models.UsuarioModels;

namespace Dominio.Interface
{
    public interface IUsuarioRepository
    {
        Task<List<Usuario>> GetAll();
        Task<Usuario> GetUsuarioByLogin(string login);
    }
}