import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Uf } from '../models/uf';
import { TipoFrete } from '../models/tipo-frete';

@Injectable({
  providedIn: 'root'
})
export class TipoFreteService {

  constructor(private httpClient: HttpClient) { }

  getAllAtivos(): Observable<TipoFrete[]> {
    return this.httpClient.get<TipoFrete[]>('https://localhost:7072' + '/tipofrete/GetAllAtivos');
  }

}
