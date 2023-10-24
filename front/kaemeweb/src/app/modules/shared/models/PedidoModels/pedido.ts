export interface Pedido {
  num_Pedido?: number | null;
  cliente_Id: number;
  usuario_Id: number;
  data_Pedido: Date;
  ativo: boolean;
  cancelado: boolean;
  status_Pedido_Id: number;

  // Apenas para visualização
  cliente?: string;
  usuario?: string;
  data_Nasc?: Date;
}
