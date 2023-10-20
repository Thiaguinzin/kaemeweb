using Dominio.Interface;
using Dominio.Models;
using Dominio.Models.UsuarioModels;
using Dominio.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPIShared.Controllers;

namespace KaemeWebApi.Controllers;

[ApiController]
[Route("pedido")]
public class PedidoController : BaseApiController
{
    private readonly PedidoService _pedidoService;
    public PedidoController(IPedidoRepository pedidoRepository)
    {
        _pedidoService = new PedidoService(pedidoRepository);
    }

    [HttpPost("[action]")]
    public IActionResult Create([FromBody] PedidoCreate pedido)
    {
        var result = _pedidoService.Create(pedido);
        return GetActionResult(result);
    }

    [HttpPost("[action]")]
    public IActionResult GetPedidoBySearch([FromBody] PedidoSearch pedidoSearch)
    {
        var result = _pedidoService.GetPedidoBySearch(pedidoSearch);
        return GetActionResult(result);
    }    
    
}
