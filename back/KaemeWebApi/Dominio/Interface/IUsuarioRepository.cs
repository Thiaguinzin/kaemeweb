using Dominio.Models.UsuarioModels;

namespace Dominio.Interface
{
    public interface IUsuarioRepository
    {
        bool Create(Usuario usuario);
        bool Update(Usuario usuario);
        bool Delete(int id);
        Task<List<Usuario>> GetAll();
        Task<Usuario> GetUsuarioByLogin(string login);
        Task<Usuario> GetUsuarioById(int id);
        List<Usuario> GetUsuarioBySearch(string? login, string? nome, string? perfil_id, bool? ativo);
    }
}