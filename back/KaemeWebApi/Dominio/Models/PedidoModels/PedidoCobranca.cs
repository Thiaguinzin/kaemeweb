namespace Dominio.Models
{
    public partial class PedidoCobranca 
    {
        public int? Id { get; set; }
        public int? Num_Pedido { get; set; }
        public decimal Valor_Total { get; set; }
        public decimal? Valor_Pedido { get; set; }
        public decimal? Valor_Pago { get; set; }
        public DateTime? Data_Pagamento { get; set; }
        public int? Tipo_Pagamento_Id { get; set; }
        public int? Parcelas { get; set; }
        public bool Pago { get; set; }
        public bool Cancelado { get; set; }

    }
}