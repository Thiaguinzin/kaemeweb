export interface PedidoSearch {
  num_Pedido?: string | null;
  cliente_Id?: string | null;
  usuario_Id?: string | null;
  data_Inicio_Pedido?: Date | null;
  data_Fim_Pedido?: Date | null;
  data_Inicio_Pagamento?: Date | null;
  data_Fim_Pagamento?: Date | null;
  status_Pedido_Id?: Date | null;
  pago?: boolean | null;
  tipo_Pagamento_Id?: string | null;
}
