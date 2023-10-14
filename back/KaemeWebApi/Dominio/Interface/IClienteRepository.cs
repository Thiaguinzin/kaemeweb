using Dominio.Models;
using Dominio.Models.UsuarioModels;

namespace Dominio.Interface
{
    public interface IClienteRepository
    {
        bool Create(Cliente cliente);
        bool Update(Cliente cliente);
        bool Delete(int id);
        Task<List<Cliente>> GetAllTop();
        Task<Cliente> GetClienteById(int id);
        List<Cliente> GetClienteBySearch(string? nome, string? cpf);
    }
}