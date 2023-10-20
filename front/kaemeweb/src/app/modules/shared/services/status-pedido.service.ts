import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Uf } from '../models/uf';
import { TipoFrete } from '../models/tipo-frete';
import { TipoPagamento } from '../models/tipo-pagamento';
import { StatusPedido } from '../models/status-pedido';

@Injectable({
  providedIn: 'root'
})
export class StatusPedidoService {

  constructor(private httpClient: HttpClient) { }

  getAllAtivos(): Observable<StatusPedido[]> {
    return this.httpClient.get<StatusPedido[]>('https://localhost:7072' + '/statuspedido/GetAllAtivos');
  }

}
