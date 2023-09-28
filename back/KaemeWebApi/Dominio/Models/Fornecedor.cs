namespace Dominio.Models
{
    public partial class Fornecedor
    {
        public int? Id { get; set; }
        public string Razao_Social { get; set; }
        public string? Logradouro { get; set; }
        public string? Uf { get; set; }
        public string? Cnpj { get; set; }
        public string? Instagram { get; set; }
        public string? Email { get; set; }
        public string? Telefone { get; set; }
        public decimal? Min_Pedido_Atacado { get; set; }
        public decimal? Perc_Desc_A_Vista { get; set; }
        public int? Tipo_Frete_Id { get; set; }
        public DateTime? Data_Criacao { get; set; }
        public int? Criado_Por { get; set; }


        // Campos auxiliares
        public string? Tipo_Frete { get; set; }
    }
}