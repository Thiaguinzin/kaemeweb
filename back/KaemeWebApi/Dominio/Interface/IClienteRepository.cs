using Dominio.Models;
using Dominio.Models.UsuarioModels;

namespace Dominio.Interface
{
    public interface IClienteRepository
    {
        bool Create(Cliente cliente);
    }
}