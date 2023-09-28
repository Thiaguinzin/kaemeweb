using Dominio.Interface;
using Dominio.Models;
using Dominio.Models.UsuarioModels;
using Dominio.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPIShared.Controllers;

namespace KaemeWebApi.Controllers;

[ApiController]
[Route("tipopeca")]
public class TipoPecaController : BaseApiController
{
    private readonly TipoPecaService _tipoPecaService;
    public TipoPecaController(ITipoPecaRepository tipoPecaRepository)
    {
        _tipoPecaService = new TipoPecaService(tipoPecaRepository);
    }

    [HttpPost("[action]")]
    public IActionResult Create([FromBody] TipoPeca tipoPeca)
    {
        var result = _tipoPecaService.Create(tipoPeca);
        return GetActionResult(result);
    }

    [HttpDelete("[action]")]
    public IActionResult Delete([FromQuery] int id)
    {
        var result = _tipoPecaService.Delete(id);
        return GetActionResult(result);
    }    

    [HttpGet("[action]")]
    public IActionResult GetAll()
    {
        var result = _tipoPecaService.GetAll();
        return GetActionResult(result);
    }

    [HttpGet("[action]")]
    public IActionResult GetAllAtivos()
    {
        var result = _tipoPecaService.GetAllAtivos();
        return GetActionResult(result);
    }    
    
}
