namespace Dominio.Models
{
    public partial class Peca
    {
        public int? Id { get; set; }
        public string Codigo { get; set; }
        public string Descricao { get; set; }
        public decimal Valor_Compra { get; set; }
        public decimal Valor_Venda { get; set; }
        public int Quantidade { get; set; }
        public bool Ativo { get; set; }
        public int Tipo_Peca_Id { get; set; }
        public int Fornecedor_Id { get; set; }
        public string? Observacao { get; set; }
        public DateTime Data_Criacao { get; set; }
        public int Criado_Por { get; set; }

    }
}