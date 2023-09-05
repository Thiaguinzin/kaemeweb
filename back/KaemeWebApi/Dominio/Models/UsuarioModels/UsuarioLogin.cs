namespace Dominio.Models.UsuarioModels
{
    public partial class UsuarioLogin
    {
        public int? Id { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
        public string? Nome { get; set; }
        public DateTime? Data_Criacao { get; set; }
        public bool? Ativo { get; set; }
    }
}