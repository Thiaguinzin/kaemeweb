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
    
}