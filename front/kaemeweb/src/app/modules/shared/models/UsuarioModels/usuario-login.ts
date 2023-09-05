export interface UsuarioLogin {
  id?: number | null;
  login: string;
  senha: string;
  nome?: string | null;
  data_Criacao?: string | null;
  ativo?: boolean | null;
}
