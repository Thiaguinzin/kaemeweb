namespace Dominio.Models
{
    public partial class PedidoSearch
    {
        public string? Num_Pedido { get; set; }
        public string? Cliente_Id { get; set; }
        public string? Usuario_Id { get; set; }
        public DateTime? Data_Inicio_Pedido { get; set; }
        public DateTime? Data_Fim_Pedido { get; set; }
        public DateTime? Data_Inicio_Pagamento { get; set; }
        public DateTime? Data_Fim_Pagamento { get; set; }
        public string? Status_Pedido_Id { get; set; }
        public bool? Pago { get; set; }
        public string? Tipo_Pagamento_Id { get; set; }

    }
}