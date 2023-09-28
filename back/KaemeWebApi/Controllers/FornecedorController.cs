using Dominio.Interface;
using Dominio.Models;
using Dominio.Models.UsuarioModels;
using Dominio.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPIShared.Controllers;

namespace KaemeWebApi.Controllers;

[ApiController]
[Route("fornecedor")]
public class FornecedorController : BaseApiController
{
    private readonly FornecedorService _fornecedorService;
    public FornecedorController(IFornecedorRepository fornecedorRepository)
    {
        _fornecedorService = new FornecedorService(fornecedorRepository);
    }

    [HttpPost("[action]")]
    public IActionResult Create([FromBody] Fornecedor fornecedor)
    {
        var result = _fornecedorService.Create(fornecedor);
        return GetActionResult(result);
    }   
    
}
