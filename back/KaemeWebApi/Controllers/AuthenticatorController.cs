using Dominio.Interface;
using Dominio.Models.UsuarioModels;
using Dominio.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPIShared.Controllers;

namespace KaemeWebApi.Controllers;

[ApiController]
[Route("auth")]
public class AuthenticatorController : BaseApiController
{
    private readonly UsuarioService _usuarioService;
    public AuthenticatorController(IUsuarioRepository usuarioRepository, IConfiguration configuration)
    {
        _usuarioService = new UsuarioService(usuarioRepository, configuration);
    }

    [AllowAnonymous]
    [HttpPost("[action]")]
    public async Task<IActionResult> Auth(UsuarioLogin usuarioLogin)
    {
        var result = await _usuarioService.Login(usuarioLogin);
        return GetActionResult(result);
    }
}
