using Dominio.Interface;
using Dominio.Models.UsuarioModels;
using Dominio.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPIShared.Controllers;

namespace KaemeWebApi.Controllers;

[ApiController]
[Route("statuspedido")]
public class StatusPedidoController : BaseApiController
{
    private readonly StatusPedidoService _statusPedidoService;
    public StatusPedidoController(IStatusPedidoRepository statusPedidoRepository)
    {
        _statusPedidoService = new StatusPedidoService(statusPedidoRepository);
    }

    [HttpGet("[action]")]
    public IActionResult GetAllAtivos()
    {
        var result = _statusPedidoService.GetAllAtivos();
        return GetActionResult(result);
    }
}
