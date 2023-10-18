namespace Dominio.Models
{
    public partial class PedidoPeca
    {
        public int? Id { get; set; }
        public int? Num_Pedido { get; set; }
        public int Quantidade { get; set; }
        public int Peca_Id { get; set; }
        public decimal Valor_Peca { get; set; }

    }
}