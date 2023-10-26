export interface PedidoInformation {
  num_Pedido: number | null;
  cliente_Id: number;
  usuario_Id: number;
  data_Pedido: Date;
  ativo: boolean;
  cancelado: boolean;
  status_Pedido_Id: number;
  funcionario: string;
  cliente: string;
  status_Pedido: string;
  valor_Total: number;
  valor_Pedido: number | null;
  valor_Pago: number | null;
  data_Pagamento: Date | null;
  tipo_Pagamento: string | null;
  parcelas: number | null;
  pago: boolean;
  peca_Id: number | null;
  peca_Codigo: string | null;
  quantidade: number | null;
  valor_Peca: number | null;
}
