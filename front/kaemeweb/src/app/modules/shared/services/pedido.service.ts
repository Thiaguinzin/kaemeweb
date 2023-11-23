import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Cliente } from '../models/cliente';
import { PedidoCreate } from '../models/PedidoModels/pedido-create';
import { PedidoSearch } from '../models/PedidoModels/pedido-search';
import { PedidoInformation } from '../models/PedidoModels/pedido-information';
import { PedidoCobranca } from '../models/PedidoModels/pedido-cobranca';
import { Pedido } from '../models/PedidoModels/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private httpClient: HttpClient) { }

  create(pedidoCreate: PedidoCreate): Observable<Pedido> {
    return this.httpClient.post<Pedido>('https://localhost:7072' + '/pedido/Create', pedidoCreate);
  }

  delete(pedido: PedidoInformation): Observable<boolean> {
    return this.httpClient.post<boolean>('https://localhost:7072' + '/pedido/Delete', pedido);
  }

  getPedidoBySearch(pedidoSearch: PedidoSearch): Observable<PedidoInformation[]> {
    return this.httpClient.post<PedidoInformation[]>('https://localhost:7072' + '/pedido/GetPedidoBySearch', pedidoSearch);
  }

  getTop100Pedidos(): Observable<PedidoInformation[]> {
    return this.httpClient.get<PedidoInformation[]>('https://localhost:7072' + '/pedido/GetTop100Pedidos');
  }

  getPedidoByNumPedido(num_pedido: number): Observable<PedidoCreate> {
    let params = new HttpParams()
    params = params.append('num_pedido', num_pedido)
    return this.httpClient.get<PedidoCreate>('https://localhost:7072' + '/pedido/GetPedidoByNumPedido', {params});
  }

  atualizarPedidoCobranca(pedidoCobranca: PedidoCobranca, baixar: boolean): Observable<boolean> {
    let params = new HttpParams()
    params = params.append('baixar', baixar)
    return this.httpClient.post<boolean>('https://localhost:7072' + '/pedido/AtualizarPedidoCobranca', pedidoCobranca, {params});
  }

  atualizarStatusPedido(num_pedido: number, status_pedido_id: number): Observable<boolean> {
    let params = new HttpParams()
    params = params.append('num_pedido', num_pedido)
    params = params.append('status_pedido_id', status_pedido_id)

    return this.httpClient.get<boolean>('https://localhost:7072' + '/pedido/AtualizarStatusPedido?num_pedido=' +num_pedido + '&status_pedido_id='+status_pedido_id);
  }

  getPedidoCliente(num_pedido: number, cpf: string): Observable<PedidoInformation[]> {
    let params = new HttpParams()
    params = params.append('num_pedido', num_pedido)
    params = params.append('cpf', cpf)
    return this.httpClient.get<PedidoInformation[]>('https://localhost:7072' + '/pedido/GetPedidoCliente', {params});
  }

  confirmarRecebimento(num_pedido: number): Observable<boolean> {
    let params = new HttpParams()
    params = params.append('num_pedido', num_pedido)

    return this.httpClient.get<boolean>('https://localhost:7072' + '/pedido/ConfirmarRecebimento?num_pedido=' +num_pedido);
  }

}
