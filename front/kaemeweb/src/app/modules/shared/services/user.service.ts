import { TokenService } from './token.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioLogin } from '../models/UsuarioModels/usuario-login';
import { UsuarioToken } from '../models/UsuarioModels/usuario-token';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../models/UsuarioModels/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient,
              private tokenService: TokenService) { }

  setToken(token: string): void {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  setInfo(nome_user: string, id_user: number, perfil_id: string): void {
    window.localStorage.setItem("k_user", nome_user);
    window.localStorage.setItem("k_user_id", id_user.toString());
    window.localStorage.setItem("k_user_perfil_id", perfil_id);
  }

  logout(): void {
    this.tokenService.removeToken();
  }

  isLogged(): boolean {
    if (this.tokenService.hasToken()) {
        const token: UsuarioToken = JSON.parse(this.tokenService.getToken());
        const dataExpiracao = new Date(token.Expiracao);
        if (dataExpiracao < new Date()) {
            this.logout();
        }
    }
    return this.tokenService.hasToken();
  }

  private decodeAndNotify(): void {
    const token = this.tokenService.getToken();
  }

  create(usuario: Usuario): Observable<boolean> {
    return this.httpClient.post<boolean>('https://localhost:7072' + '/usuario/Create', usuario);
  }

  update(usuario: Usuario): Observable<boolean> {
    return this.httpClient.put<boolean>('https://localhost:7072' + '/usuario/Update', usuario);
  }

  getUsuarioBySearch(login?: string, nome?: string, perfil_id?: string, ativo?: string): Observable<Usuario[]> {
    let params = new HttpParams()
    params = params.append('login', login)
    params = params.append('nome', nome)
    params = params.append('perfil_id', perfil_id)
    params = params.append('ativo', ativo)

    return this.httpClient.get<Usuario[]>('https://localhost:7072' + '/usuario/GetUsuarioBySearch', {params});
  }

  getUsuarioById(id: number): Observable<Usuario> {
    let params = new HttpParams()
    params = params.append('id', id)

    return this.httpClient.get<Usuario>('https://localhost:7072' + '/usuario/GetUsuarioById', {params});
  }

  getAll(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>('https://localhost:7072' + '/usuario/GetAll');
  }

}
