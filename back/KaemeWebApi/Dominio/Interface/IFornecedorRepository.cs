using Dominio.Models;

namespace Dominio.Interface
{
    public interface IFornecedorRepository
    {
        bool Create(Fornecedor cliente);
        bool Update(Fornecedor cliente);
        bool Delete(int id);
        List<Fornecedor> GetAll();
        Fornecedor GetFornecedorById(int id);
    }
}