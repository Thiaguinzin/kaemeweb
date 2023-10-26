import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Cliente } from '../models/cliente';
import { PedidoCreate } from '../models/PedidoModels/pedido-create';
import { PedidoSearch } from '../models/PedidoModels/pedido-search';
import { PedidoInformation } from '../models/PedidoModels/pedido-information';
import { PedidoCobranca } from '../models/PedidoModels/pedido-cobranca';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private httpClient: HttpClient) { }

  create(pedidoCreate: PedidoCreate): Observable<boolean> {
    return this.httpClient.post<boolean>('https://localhost:7072' + '/pedido/Create', pedidoCreate);
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

  getPedidoCliente(num_pedido: number, cpf: string): Observable<PedidoInformation[]> {
    let params = new HttpParams()
    params = params.append('num_pedido', num_pedido)
    params = params.append('cpf', cpf)
    return this.httpClient.get<PedidoInformation[]>('https://localhost:7072' + '/pedido/GetPedidoCliente', {params});
  }

}
