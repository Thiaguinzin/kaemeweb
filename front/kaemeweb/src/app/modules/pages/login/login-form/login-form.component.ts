import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioLogin } from 'src/app/modules/shared/models/UsuarioModels/usuario-login';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  token: string;
  usuarioLogado: UsuarioLogin;

  form = this.fb.group ({
    login: ['', [Validators.required]],
    senha: ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) {}

  ngOnInit() {

  }

  login() {

    const usuarioLogin: UsuarioLogin = this.montarUsuarioLogin();

    this.authService.login(usuarioLogin)
      .subscribe(res => {

        if (res.body.authenticated) {
          this.token = res.body.token;
          this.usuarioLogado = res.body.usuario;
          this.logarUsuario();
        } else {
          this.toastr.error(res.body.errorMessage);
        }
      }, error => {
        this.toastr.error("Algo deu errado!");
      })

  }

  logarUsuario() {
    this.authService.logarUsuario(this.token, this.usuarioLogado);
    this.router.navigateByUrl("/gestao");
  }


  montarUsuarioLogin(): UsuarioLogin {
    return {
      login: this.form.get('login').value.trim(),
      senha: this.form.get('senha').value.trim(),
    }
  }

}
