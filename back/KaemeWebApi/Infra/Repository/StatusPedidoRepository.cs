using Dapper;
using Dominio.Interface;
using Dominio.Models;
using Infra.Context;

namespace Infra.Repository
{
    public class StatusPedidoRepository : IStatusPedidoRepository
    {
        private readonly DapperContext _context;

        public StatusPedidoRepository(DapperContext context)
        {
            _context = context;
        }

        public List<StatusPedido> GetAllAtivos()
        {
            var query = "SELECT * FROM status_pedido where ativo = 1";

            using (var connection = _context.CreateConnection())
            {
                var status_pedido = connection.Query<StatusPedido>(query);
                return status_pedido.ToList();
            }
        }
    }
}