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
}
