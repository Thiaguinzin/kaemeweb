using Dominio.Models.UsuarioModels;

namespace Dominio.Interface
{
    public interface IUsuarioRepository
    {
        bool Create(Usuario usuario);
        Task<List<Usuario>> GetAll();
        Task<Usuario> GetUsuarioByLogin(string login);
        List<Usuario> GetUsuarioBySearch(string? login, string? nome, string? perfil_id, bool? ativo);
    }
}