import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioLogin } from '../models/UsuarioModels/usuario-login';
import { UsuarioToken } from '../models/UsuarioModels/usuario-token';
import { tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
              private userService: UserService) { }

  login(usuario: UsuarioLogin)//: Observable<UsuarioToken>
  {
      return this.httpClient.post<UsuarioToken>('https://localhost:7072' + '/auth/Auth',usuario, { observe: 'response' })
          .pipe(tap(res => {
              const usuarioToken = res.body;
          }));
  }

  logarUsuario(token: string, usuario: UsuarioLogin)
  {
      this.userService.setToken(JSON.stringify(token));
      this.userService.setInfo(usuario.nome);
  }

}
