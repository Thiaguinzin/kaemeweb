namespace Dominio.Models
{
    public partial class Pedido
    {
        public int? Num_Pedido { get; set; }
        public int Cliente_Id { get; set; }
        public int Usuario_Id { get; set; }
        public DateTime Data_Pedido { get; set; }
        public bool Ativo { get; set; }
        public bool Cancelado { get; set; }
        public int Status_Pedido_Id { get; set; }

        // Apenas para visualização
        public string? Cliente { get; set; }
        public string? Usuario { get; set; }
        public DateTime? Data_Nasc { get; set; }

    }
}