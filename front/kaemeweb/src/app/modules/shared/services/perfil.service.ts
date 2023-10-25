import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Uf } from '../models/uf';
import { TipoFrete } from '../models/tipo-frete';
import { TipoPagamento } from '../models/tipo-pagamento';
import { Perfil } from '../models/perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private httpClient: HttpClient) { }

  getAllAtivos(): Observable<Perfil[]> {
    return this.httpClient.get<Perfil[]>('https://localhost:7072' + '/perfil/GetAllAtivos');
  }

}
