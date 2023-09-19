using Dominio.Interface;
using Dominio.Models.UsuarioModels;
using Dominio.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPIShared.Controllers;

namespace KaemeWebApi.Controllers;

[ApiController]
[Route("uf")]
public class UfController : BaseApiController
{
    private readonly UfService _ufService;
    public UfController(IUfRepository ufRepository)
    {
        _ufService = new UfService(ufRepository);
    }

    [HttpGet("[action]")]
    public IActionResult GetAll()
    {
        var result = _ufService.GetAll();
        return GetActionResult(result);
    }
}
