import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Uf } from '../models/uf';

@Injectable({
  providedIn: 'root'
})
export class UfService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Uf[]> {
    return this.httpClient.get<Uf[]>('https://localhost:7072' + '/uf/GetAll');
  }

}
