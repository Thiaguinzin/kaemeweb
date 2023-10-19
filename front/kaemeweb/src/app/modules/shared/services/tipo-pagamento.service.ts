import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Uf } from '../models/uf';
import { TipoFrete } from '../models/tipo-frete';
import { TipoPagamento } from '../models/tipo-pagamento';

@Injectable({
  providedIn: 'root'
})
export class TipoPagamentoService {

  constructor(private httpClient: HttpClient) { }

  getAllAtivos(): Observable<TipoPagamento[]> {
    return this.httpClient.get<TipoPagamento[]>('https://localhost:7072' + '/tipopagamento/GetAllAtivos');
  }

}
