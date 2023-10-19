using Dominio.Interface;
using Dominio.Models.UsuarioModels;
using Dominio.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPIShared.Controllers;

namespace KaemeWebApi.Controllers;

[ApiController]
[Route("tipopagamento")]
public class TipoPagamentoController : BaseApiController
{
    private readonly TipoPagamentoService _tipoPagamentoService;
    public TipoPagamentoController(ITipoPagamentoRepository tipoPagamentoRepository)
    {
        _tipoPagamentoService = new TipoPagamentoService(tipoPagamentoRepository);
    }

    [HttpGet("[action]")]
    public IActionResult GetAllAtivos()
    {
        var result = _tipoPagamentoService.GetAllAtivos();
        return GetActionResult(result);
    }
}
