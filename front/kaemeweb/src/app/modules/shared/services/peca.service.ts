import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Peca } from '../models/peca';

@Injectable({
  providedIn: 'root'
})
export class PecaService {

  constructor(private httpClient: HttpClient) { }

  create(peca: Peca): Observable<boolean> {
    return this.httpClient.post<boolean>('https://localhost:7072' + '/peca/Create', peca);
  }

  update(peca: Peca): Observable<boolean> {
    return this.httpClient.put<boolean>('https://localhost:7072' + '/peca/Update', peca);
  }

  delete(id: number): Observable<boolean> {
    let params = new HttpParams()
    params = params.append('id', id)

    return this.httpClient.delete<boolean>('https://localhost:7072' + '/peca/Delete', {params});
  }

  getTop100(): Observable<Peca[]> {
    return this.httpClient.get<Peca[]>('https://localhost:7072' + '/peca/GetTop100');
  }

  getPecaById(id: number): Observable<Peca> {
    let params = new HttpParams()
    params = params.append('id', id)

    return this.httpClient.get<Peca>('https://localhost:7072' + '/peca/GetPecaById', {params});
  }

}
