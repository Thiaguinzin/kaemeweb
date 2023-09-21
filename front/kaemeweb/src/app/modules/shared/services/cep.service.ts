import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioToken } from '../models/UsuarioModels/usuario-token';
import { CepReturn } from '../models/cep-return';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private httpClient: HttpClient) { }

  consultarCep(cep: string) {
    return this.httpClient.get<CepReturn>('https://viacep.com.br/ws/' + cep + '/json');
  }

}
