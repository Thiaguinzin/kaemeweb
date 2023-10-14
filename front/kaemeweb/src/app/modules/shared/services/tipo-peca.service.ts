import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Cliente } from '../models/cliente';
import { Fornecedor } from '../models/fornecedor';
import { TipoPeca } from '../models/tipo-peca';

@Injectable({
  providedIn: 'root'
})
export class TipoPecaService {

  constructor(private httpClient: HttpClient) { }

  create(tipo_peca: TipoPeca): Observable<boolean> {
    return this.httpClient.post<boolean>('https://localhost:7072' + '/tipopeca/Create', tipo_peca);
  }

  update(tipo_peca: TipoPeca): Observable<boolean> {
    return this.httpClient.put<boolean>('https://localhost:7072' + '/tipopeca/Update', tipo_peca);
  }

  delete(id: number): Observable<boolean> {
    let params = new HttpParams()
    params = params.append('id', id)

    return this.httpClient.delete<boolean>('https://localhost:7072' + '/tipopeca/Delete', {params});
  }

  getAll(): Observable<TipoPeca[]> {
    return this.httpClient.get<TipoPeca[]>('https://localhost:7072' + '/tipopeca/GetAll');
  }

  getAllAtivos(): Observable<TipoPeca[]> {
    return this.httpClient.get<TipoPeca[]>('https://localhost:7072' + '/tipopeca/GetAllAtivos');
  }

}
