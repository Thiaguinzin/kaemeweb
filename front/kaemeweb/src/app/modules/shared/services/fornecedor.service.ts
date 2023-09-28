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

}
