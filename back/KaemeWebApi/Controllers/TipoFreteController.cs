using Dominio.Interface;
using Dominio.Models.UsuarioModels;
using Dominio.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPIShared.Controllers;

namespace KaemeWebApi.Controllers;

[ApiController]
[Route("tipofrete")]
public class TipoFreteController : BaseApiController
{
    private readonly TipoFreteService _tipoFreteService;
    public TipoFreteController(ITipoFreteRepository tipoFreteRepository)
    {
        _tipoFreteService = new TipoFreteService(tipoFreteRepository);
    }

    [HttpGet("[action]")]
    public IActionResult GetAllAtivos()
    {
        var result = _tipoFreteService.GetAllAtivos();
        return GetActionResult(result);
    }
}
