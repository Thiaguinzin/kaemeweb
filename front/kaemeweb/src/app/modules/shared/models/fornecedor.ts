export interface Fornecedor {
  id: number | null;
  razao_Social: string;
  logradouro: string | null;
  uf: string | null;
  cnpj: string | null;
  instagram: string | null;
  email: string | null;
  telefone: string | null;
  min_Pedido_Atacado: number | null;
  perc_Desc_A_Vista: number | null;
  tipo_Frete_Id: number | null;
  data_Criacao: Date | null;
  criado_Por: number | null;

  // Campos auxiliares
  tipo_Frete?: string | null;
}
