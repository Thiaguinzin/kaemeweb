using Dominio.Interface;
using Dominio.Models.UsuarioModels;
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

    [HttpPost("[action]")]
    public IActionResult Create([FromBody] Usuario usuario)
    {
        var result = _usuarioService.Create(usuario);
        return GetActionResult(result);
    }

    [HttpPut("[action]")]
    public IActionResult Update([FromBody] Usuario usuario)
    {
        var result = _usuarioService.Update(usuario);
        return GetActionResult(result);
    }

    [HttpDelete("[action]")]
    public IActionResult Delete([FromQuery] int id)
    {
        var result = _usuarioService.Delete(id);
        return GetActionResult(result);
    }    

    [HttpGet("[action]")]
    public async Task<IActionResult> GetAll()
    {
        var result = await _usuarioService.GetAll();
        return GetActionResult(result);
    }

    [HttpGet("[action]")]
    public IActionResult GetUsuarioBySearch([FromQuery] string? login, [FromQuery] string? nome, [FromQuery] string? perfil_id, [FromQuery] bool? ativo)
    {
        var result = _usuarioService.GetUsuarioBySearch(login, nome, perfil_id, ativo);
        return GetActionResult(result);
    }

    [HttpGet("[action]")]
    public async Task<IActionResult> GetUsuarioById([FromQuery] int id)
    {
        var result = await _usuarioService.GetUsuarioById(id);
        return GetActionResult(result);
    }    
}
