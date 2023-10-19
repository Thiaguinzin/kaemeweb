import { Pedido } from "./pedido";
import { PedidoCobranca } from "./pedido-cobranca";
import { PedidoPeca } from "./pedido-peca";

export interface PedidoCreate {
    pedido: Pedido;
    pecas: PedidoPeca[];
    pedido_Cobranca: PedidoCobranca;
}
