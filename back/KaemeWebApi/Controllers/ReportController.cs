using System.Data;
using ClosedXML.Excel;
using Dominio.Interface;
using Dominio.Models;
using Dominio.Models.UsuarioModels;
using Dominio.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPIShared.Controllers;

namespace KaemeWebApi.Controllers;

[ApiController]
[Route("report")]
public class ReportController : BaseApiController
{
    private readonly PecaService _pecaService;
    public ReportController(IPecaRepository pecaRepository)
    {
        _pecaService = new PecaService(pecaRepository);
    }

    [HttpGet("[action]")]
    public IActionResult GetRelatorioEstoque(string? codigo, int? tipo_peca_id, int? fornecedor_id, bool? com_estoque = false)
    {
        var _empdata = GetPecaBySearch(codigo, tipo_peca_id, fornecedor_id, com_estoque);
        using (XLWorkbook wb = new XLWorkbook())
        {
            wb.AddWorksheet(_empdata, "Peças no Estoque");
            using(MemoryStream ms = new MemoryStream())
            {
                wb.SaveAs(ms);
                return File(ms.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Pecas_Estoque.xlsx");
            }
        }
    }


    [NonAction]
    private DataTable GetPecaBySearch(string? codigo, int? tipo_peca_id, int? fornecedor_id, bool? com_estoque = false)
    {

        DataTable dt = new DataTable();
        dt.TableName = "peca";
        dt.Columns.Add("Código", typeof(string));
        dt.Columns.Add("Descrição", typeof(string));
        dt.Columns.Add("Valor de Compra", typeof(decimal));
        dt.Columns.Add("Valor de Venda", typeof(decimal));
        dt.Columns.Add("Quantidade", typeof(int));
        dt.Columns.Add("Tipo de Peça", typeof(string));
        dt.Columns.Add("Fornecedor", typeof(string));

        var pecas = _pecaService.GetPecaBySearchReport(codigo, tipo_peca_id, fornecedor_id, com_estoque);

        if (pecas.Count > 0) {
            pecas.ForEach(item => {
                dt.Rows.Add(
                    item.Codigo,
                    item.Descricao,
                    item.Valor_Compra,
                    item.Valor_Venda,
                    item.Quantidade,
                    item.Tipo_Peca_Descricao,
                    item.Fornecedor
                );
            });
        }

        return dt;
    }
    
}
