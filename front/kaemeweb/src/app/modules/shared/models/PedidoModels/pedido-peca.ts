export interface PedidoPeca {
  id?: number | null;
  num_Pedido?: number | null;
  quantidade: number;
  peca_Id: number;
  valor_Peca: number;

  // Campos para visualização
  peca_Codigo?: string;
}
