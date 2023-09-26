import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private httpClient: HttpClient) { }

  create(cliente: Cliente): Observable<boolean> {
    return this.httpClient.post<boolean>('https://localhost:7072' + '/cliente/Create', cliente);
  }

  update(cliente: Cliente): Observable<boolean> {
    return this.httpClient.put<boolean>('https://localhost:7072' + '/cliente/Update', cliente);
  }

  delete(id: number): Observable<boolean> {
    let params = new HttpParams()
    params = params.append('id', id)

    return this.httpClient.delete<boolean>('https://localhost:7072' + '/cliente/Delete', {params});
  }

  getAllTop(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>('https://localhost:7072' + '/cliente/GetAllTop');
  }

  getClienteById(id: number): Observable<Cliente> {
    let params = new HttpParams()
    params = params.append('id', id)

    return this.httpClient.get<Cliente>('https://localhost:7072' + '/cliente/GetClienteById', {params});
  }

}
