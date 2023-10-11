namespace Dominio.Models
{
    public partial class TipoPagamento 
    {
        public int Id { get; set; }
        public string Codigo { get; set; }
        public string Descricao { get; set; }
        public bool Ativo { get; set; }

    }
}