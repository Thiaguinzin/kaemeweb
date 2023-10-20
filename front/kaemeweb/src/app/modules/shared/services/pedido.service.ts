import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Cliente } from '../models/cliente';
import { PedidoCreate } from '../models/PedidoModels/pedido-create';
import { PedidoSearch } from '../models/PedidoModels/pedido-search';
import { PedidoInformation } from '../models/PedidoModels/pedido-information';

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

}
