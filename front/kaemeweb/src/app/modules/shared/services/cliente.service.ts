import { HttpClient } from '@angular/common/http';
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

}
