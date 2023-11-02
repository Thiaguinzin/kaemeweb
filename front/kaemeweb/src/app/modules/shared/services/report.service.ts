import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioToken } from '../models/UsuarioModels/usuario-token';
import { CepReturn } from '../models/cep-return';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpClient: HttpClient) { }

  getRelatorioEstoque(codigo?: string, tipo_peca_id?: string, fornecedor_id?: string, com_estoque = false) {

    let params = new HttpParams()
    params = params.append('codigo', codigo)
    params = params.append('tipo_peca_id', tipo_peca_id)
    params = params.append('fornecedor_id', fornecedor_id)
    params = params.append('com_estoque', com_estoque)

    return this.httpClient.get('https://localhost:7072' + '/report/GetRelatorioEstoque', { responseType: 'blob', params: params });
  }

}
