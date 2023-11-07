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
    private readonly PedidoService _pedidoService;
    public ReportController(IPecaRepository pecaRepository, IPedidoRepository pedidoRepository)
    {
        _pecaService = new PecaService(pecaRepository);
        _pedidoService = new PedidoService(pedidoRepository, pecaRepository);
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

    [HttpPost("[action]")]
    public IActionResult GetHistoricoPedido(PedidoSearch pedidoSearch)
    {
        var _empdata = GetHistoricoPedidoData(pedidoSearch);
        using (XLWorkbook wb = new XLWorkbook())
        {
            wb.AddWorksheet(_empdata, "Histórico de Pedidos");
            using(MemoryStream ms = new MemoryStream())
            {
                wb.SaveAs(ms);
                return File(ms.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Pecas_Estoque.xlsx");
            }
        }
    }


    [NonAction]
    private DataTable GetHistoricoPedidoData(PedidoSearch pedidoSearch)
    {

        DataTable dt = new DataTable();
        dt.TableName = "pedidos";
        dt.Columns.Add("N° Pedido", typeof(string));
        dt.Columns.Add("Data Pedido", typeof(DateTime));
        dt.Columns.Add("Funcionário", typeof(string));
        dt.Columns.Add("Cliente", typeof(string));
        dt.Columns.Add("Status Pedido", typeof(string));
        dt.Columns.Add("Peça", typeof(string));
        dt.Columns.Add("Tipo Peça", typeof(string));
        dt.Columns.Add("Quantidade", typeof(string));
        dt.Columns.Add("Valor Peça(s)", typeof(decimal));
        dt.Columns.Add("Valor Pedido", typeof(decimal));
        dt.Columns.Add("Valor Pago", typeof(decimal));
        dt.Columns.Add("Data Pagamento", typeof(DateTime));
        dt.Columns.Add("Cancelado", typeof(bool));

        var pedidos = _pedidoService.GetHistoricoPedido(pedidoSearch);

        if (pedidos.Count > 0) {
            pedidos.ForEach(item => {
                dt.Rows.Add(
                    item.Num_Pedido,
                    item.Data_Pedido,
                    item.Funcionario,
                    item.Cliente,
                    item.Status_Pedido,
                    item.Peca_Codigo,
                    item.Tipo_Peca,
                    item.Quantidade,
                    item.Valor_Peca,
                    item.Valor_Pedido,
                    item.Valor_Pago,
                    item.Data_Pagamento,
                    item.Cancelado
                );
            });
        }

        return dt;
    }    
    
    
}
