using Dominio.Interface;
using Dominio.Models;
using Dominio.Models.UsuarioModels;
using Dominio.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPIShared.Controllers;

namespace KaemeWebApi.Controllers;

[ApiController]
[Route("cliente")]
public class ClienteController : BaseApiController
{
    private readonly ClienteService _clienteService;
    public ClienteController(IClienteRepository clienteRepository)
    {
        _clienteService = new ClienteService(clienteRepository);
    }

    [HttpPost("[action]")]
    public IActionResult Create([FromBody] Cliente cliente)
    {
        var result = _clienteService.Create(cliente);
        return GetActionResult(result);
    }

    [HttpPut("[action]")]
    public IActionResult Update([FromBody] Cliente cliente)
    {
        var result = _clienteService.Update(cliente);
        return GetActionResult(result);
    }

    [HttpDelete("[action]")]
    public IActionResult Delete([FromQuery] int id)
    {
        var result = _clienteService.Delete(id);
        return GetActionResult(result);
    }

    [HttpGet("[action]")]
    public async Task<IActionResult> GetAllTop()
    {
        var result = await _clienteService.GetAllTop();
        return GetActionResult(result);
    }

    [HttpGet("[action]")]
    public async Task<IActionResult> GetClienteById([FromQuery] int id)
    {
        var result = await _clienteService.GetClienteById(id);
        return GetActionResult(result);
    }

    [HttpGet("[action]")]
    public IActionResult GetClienteBySearch([FromQuery] string? nome, string? cpf)
    {
        var result = _clienteService.GetClienteBySearch(nome, cpf);
        return GetActionResult(result);
    }
    
}
