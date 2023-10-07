using Dominio.Interface;
using Dominio.Models;
using Dominio.Models.UsuarioModels;
using Dominio.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPIShared.Controllers;

namespace KaemeWebApi.Controllers;

[ApiController]
[Route("peca")]
public class PecaController : BaseApiController
{
    private readonly PecaService _pecaService;
    public PecaController(IPecaRepository pecaRepository)
    {
        _pecaService = new PecaService(pecaRepository);
    }

    [HttpPost("[action]")]
    public IActionResult Create([FromBody] Peca peca)
    {
        var result = _pecaService.Create(peca);
        return GetActionResult(result);
    }

    [HttpPut("[action]")]
    public IActionResult Update([FromBody] Peca peca)
    {
        var result = _pecaService.Update(peca);
        return GetActionResult(result);
    }

    [HttpDelete("[action]")]
    public IActionResult Delete([FromQuery] int id)
    {
        var result = _pecaService.Delete(id);
        return GetActionResult(result);
    }

    [HttpGet("[action]")]
    public IActionResult GetTop100()
    {
        var result = _pecaService.GetTop100();
        return GetActionResult(result);
    }

    [HttpGet("[action]")]
    public IActionResult GetPecaById(int id)
    {
        var result = _pecaService.GetPecaById(id);
        return GetActionResult(result);
    }      
    
}
