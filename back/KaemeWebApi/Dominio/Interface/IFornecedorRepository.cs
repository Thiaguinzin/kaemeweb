using Dominio.Models;

namespace Dominio.Interface
{
    public interface IFornecedorRepository
    {
        bool Create(Fornecedor cliente);
        // bool Update(Fornecedor cliente);
        // bool Delete(int id);
        // Task<List<Fornecedor>> GetAllTop();
        // Task<Fornecedor> GetClienteById(int id);
    }
}