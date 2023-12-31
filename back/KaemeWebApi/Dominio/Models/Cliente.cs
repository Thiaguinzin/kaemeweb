namespace Dominio.Models 
{

    public partial class Cliente
    {
        public int? Id { get; set; }
        public string Nome { get; set; }
        public DateTime? Data_Nasc { get; set; }
        public string? Signo { get; set; }
        public string? CPF { get; set; }
        public string? Telefone { get; set; }
        public string? Email { get; set; }
        public string? Instagram { get; set; }
        public string? Meio_Captacao { get; set; }
        public string? CEP { get; set; }
        public string? Logradouro { get; set; }
        public int? Numero { get; set; }
        public string? Complemento { get; set; }
        public string? Bairro { get; set; }
        public string? Cidade { get; set; }
        public string? Uf { get; set; }
        public char Sexo { get; set; }
        public DateTime Data_Criacao { get; set; }
        public int Criado_Por { get; set; }
    }

}
