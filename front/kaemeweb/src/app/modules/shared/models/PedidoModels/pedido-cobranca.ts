export interface PedidoCobranca {
  id?: number | null;
  valor_Total: number;
  valor_Pedido: number | null;
  valor_Pago?: number | null;
  data_Pagamento?: Date | null;
  tipo_Pagamento_Id: number | null;
  parcelas?: number | null;
  pago: boolean;
  cancelado: boolean;
}
