using Dominio.Interface;
using Dominio.Services;
using Microsoft.AspNetCore.Mvc;
using WebAPIShared.Controllers;

namespace KaemeWebApi.Controllers;

[ApiController]
[Route("usuario")]
public class UsuarioController : BaseApiController
{
    private readonly UsuarioService _usuarioService;
    public UsuarioController(IUsuarioRepository usuarioRepository, IConfiguration configuration)
    {
        _usuarioService = new UsuarioService(usuarioRepository, configuration);
    }

    [HttpGet("[action]")]
    public async Task<IActionResult> GetAll()
    {
        var result = await _usuarioService.GetAll();
        return GetActionResult(result);
    }
}
