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

}
