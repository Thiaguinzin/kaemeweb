namespace Dominio.Models
{
    public partial class PedidoInformation
    {
        public int? Num_Pedido { get; set; }
        public int Cliente_Id { get; set; }
        public int Usuario_Id { get; set; }
        public DateTime Data_Pedido { get; set; }
        public bool Ativo { get; set; }
        public bool Cancelado { get; set; }
        public int Status_Pedido_Id { get; set; }
        public string Funcionario { get; set; }
        public string Cliente { get; set; }
        public string Status_Pedido { get; set; }
        public decimal Valor_Total { get; set; }
        public decimal? Valor_Pedido { get; set; }
        public decimal? Valor_Pago { get; set; }
        public DateTime? Data_Pagamento { get; set; }
        public string? Tipo_Pagamento { get; set; }
        public int? Parcelas { get; set; }
        public bool Pago { get; set; }        

    }
}