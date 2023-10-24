namespace Dominio.Models
{
    public partial class PedidoCreate
    {

        public Pedido Pedido { get; set; }
        public List<PedidoPeca> Pecas { get; set; }
        public PedidoCobranca Pedido_Cobranca { get; set; }
        
        // Apenas para visualização
        public List<Peca>? PecasReturn { get; set; }

    }
}