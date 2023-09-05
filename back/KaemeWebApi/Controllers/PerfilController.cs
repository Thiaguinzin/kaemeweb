using Dominio.Interface;
using Dominio.Models.UsuarioModels;
using Dominio.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPIShared.Controllers;

namespace KaemeWebApi.Controllers;

[ApiController]
[Route("perfil")]
public class PerfilController : BaseApiController
{
    private readonly PerfilService _perfilService;
    public PerfilController(IPerfilRepository perfilRepository)
    {
        _perfilService = new PerfilService(perfilRepository);
    }

    [HttpGet("[action]")]
    public async Task<IActionResult> GetAllAtivos()
    {
        var result = await _perfilService.GetAllAtivos();
        return GetActionResult(result);
    }
}
