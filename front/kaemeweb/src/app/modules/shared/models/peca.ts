export interface Peca {
  id: number | null;
  codigo: string;
  descricao: string;
  valor_Compra: number;
  valor_Venda: number;
  quantidade: number;
  ativo: boolean;
  tipo_Peca_Id: number;
  fornecedor_Id: number;
  observacao?: string | null;
  data_Criacao: Date;
  criado_Por: number;
}
