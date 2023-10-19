using Dominio.Interface;
using Shared.RepositoryShared;

namespace Dominio.Services
{
    public class TipoPagamentoService
    {
        private ITipoPagamentoRepository _tipoPagamentoRepository;

        public TipoPagamentoService(ITipoPagamentoRepository tipoPagamentoRepository)
        {
            _tipoPagamentoRepository = tipoPagamentoRepository;
        }

        public RepositoryResult GetAllAtivos()
        {
            try
            {
                var tipo_pagamentos = _tipoPagamentoRepository.GetAllAtivos();
                return RepositoryResult.AddDapper(tipo_pagamentos);
            }
            catch (Exception e)
            {
                return RepositoryResult.AddException(e);
            }
        }

    }
}