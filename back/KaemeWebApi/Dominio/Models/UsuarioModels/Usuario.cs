namespace Dominio.Models.UsuarioModels
{
    public partial class Usuario
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
        public string Nome { get; set; }
        public int Perfil_Id { get; set; }
        public DateTime Data_Criacao { get; set; }
        public bool Ativo { get; set; }
    }
}