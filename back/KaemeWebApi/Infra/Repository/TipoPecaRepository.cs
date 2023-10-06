using Dapper;
using Dominio.Interface;
using Dominio.Models;
using Dominio.Models.UsuarioModels;
using Infra.Context;

namespace Infra.Repository
{
    public class TipoPecaRepository : ITipoPecaRepository
    {
        private readonly DapperContext _context;

        public TipoPecaRepository(DapperContext context)
        {
            _context = context;
        }

        public bool Create(TipoPeca tipoPeca)
        {
            try
            {
                var sql = @"INSERT INTO tipo_peca (codigo, descricao, ativo)
                        VALUES (@Codigo, @Descricao, @Ativo)";

            using (var connection = _context.CreateConnection())
            {
		        var clienteSql = new TipoPeca() 
                {
                    Codigo = tipoPeca.Codigo,
                    Descricao = tipoPeca.Descricao,
                    Ativo = tipoPeca.Ativo
                };

                int linhasAfetadas = connection.Execute(sql, clienteSql);

                if (linhasAfetadas > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
                throw;
            }

        }

        public bool Delete(int id)
        {
            var query = $"UPDATE tipo_peca WHERE tipo_peca.id = {id}";

            using (var connection = _context.CreateConnection())
            {
                int linhasAfetadas = connection.Execute(query);

                if (linhasAfetadas > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }                
            }            

        }          

        public List<TipoPeca> GetAll()
        {
            var query = @"SELECT * FROM tipo_peca order by ativo desc";

            using (var connection = _context.CreateConnection())
            {
                var tipoPecas = connection.Query<TipoPeca>(query);
                return tipoPecas.ToList();
            }
        }

        public List<TipoPeca> GetAllAtivos()
        {
            var query = @"SELECT * FROM tipo_peca where tipo_peca.ativo = 1";

            using (var connection = _context.CreateConnection())
            {
                var tipoPecas = connection.Query<TipoPeca>(query);
                return tipoPecas.ToList();
            }
        }
    }
}