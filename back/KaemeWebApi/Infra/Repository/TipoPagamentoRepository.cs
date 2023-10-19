using Dapper;
using Dominio.Interface;
using Dominio.Models;
using Dominio.Models.UsuarioModels;
using Infra.Context;

namespace Infra.Repository
{
    public class TipoPagamentoRepository : ITipoPagamentoRepository
    {
        private readonly DapperContext _context;

        public TipoPagamentoRepository(DapperContext context)
        {
            _context = context;
        }

        public List<TipoPagamento> GetAllAtivos()
        {
            var query = "SELECT * FROM tipo_pagamento where ativo = 1";

            using (var connection = _context.CreateConnection())
            {
                var tipo_pagamentos = connection.Query<TipoPagamento>(query);
                return tipo_pagamentos.ToList();
            }
        }
    }
}