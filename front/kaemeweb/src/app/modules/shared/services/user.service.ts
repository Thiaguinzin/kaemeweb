import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioLogin } from '../models/UsuarioModels/usuario-login';
import { UsuarioToken } from '../models/UsuarioModels/usuario-token';
import { tap } from 'rxjs';

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

  setInfo(nome_user: string): void {
    window.localStorage.setItem("k_user", nome_user);
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

}
