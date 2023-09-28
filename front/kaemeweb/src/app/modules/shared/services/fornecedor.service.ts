import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Cliente } from '../models/cliente';
import { Fornecedor } from '../models/fornecedor';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  constructor(private httpClient: HttpClient) { }

  create(fornecedor: Fornecedor): Observable<boolean> {
    return this.httpClient.post<boolean>('https://localhost:7072' + '/fornecedor/Create', fornecedor);
  }

  update(fornecedor: Fornecedor): Observable<boolean> {
    return this.httpClient.put<boolean>('https://localhost:7072' + '/fornecedor/Update', fornecedor);
  }

  delete(id: number): Observable<boolean> {
    let params = new HttpParams()
    params = params.append('id', id)

    return this.httpClient.delete<boolean>('https://localhost:7072' + '/fornecedor/Delete', {params});
  }

  getAll(): Observable<Fornecedor[]> {
    return this.httpClient.get<Fornecedor[]>('https://localhost:7072' + '/fornecedor/GetAll');
  }

  getFornecedorById(id: number): Observable<Fornecedor> {
    let params = new HttpParams()
    params = params.append('id', id)

    return this.httpClient.get<Fornecedor>('https://localhost:7072' + '/fornecedor/GetFornecedorById', {params});
  }

}
