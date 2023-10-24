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
    public PedidoController(IPedidoRepository pedidoRepository, IPecaRepository pecaRepository)
    {
        _pedidoService = new PedidoService(pedidoRepository, pecaRepository);
    }

    [HttpPost("[action]")]
    public IActionResult Create([FromBody] PedidoCreate pedido)
    {
        var result = _pedidoService.Create(pedido);
        return GetActionResult(result);
    }

    [HttpPost("[action]")]
    public IActionResult AtualizarPedidoCobranca([FromBody] PedidoCobranca pedidoCobranca, [FromQuery] bool baixar)
    {
        var result = _pedidoService.AtualizarPedidoCobranca(pedidoCobranca, baixar);
        return GetActionResult(result);
    }    

    [HttpPost("[action]")]
    public IActionResult GetPedidoBySearch([FromBody] PedidoSearch pedidoSearch)
    {
        var result = _pedidoService.GetPedidoBySearch(pedidoSearch);
        return GetActionResult(result);
    }

    [HttpGet("[action]")]
    public async Task<IActionResult> GetPedidoByNumPedido([FromQuery] int num_pedido)
    {
        var result = await _pedidoService.GetPedidoByNumPedido(num_pedido);
        return GetActionResult(result);
    }

    [HttpGet("[action]")]
    public IActionResult GetTop100Pedidos()
    {
        var result = _pedidoService.GetTop100Pedidos();
        return GetActionResult(result);
    }    
    
}
