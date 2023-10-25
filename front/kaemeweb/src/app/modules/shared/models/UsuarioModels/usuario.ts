export interface Usuario {
  id?: number | null;
  login?: string;
  senha?: string;
  nome?: string;
  perfil_Id?: number;
  data_Criacao?: Date;
  ativo?: boolean;

  // Apenas para visualização
  perfil?: string | null;
}
