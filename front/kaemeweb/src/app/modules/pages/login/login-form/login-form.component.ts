import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioLogin } from 'src/app/modules/shared/models/UsuarioModels/usuario-login';
import { AuthService } from 'src/app/modules/shared/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  form = this.fb.group ({
    login: ['', [Validators.required]],
    senha: ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder,
              private authService: AuthService) {}

  ngOninit() {

  }

  login() {
    const usuarioLogin: UsuarioLogin = this.montaUsuarioLogin();

    this.authService.login(usuarioLogin)
      .subscribe(res => {
        console.log(res);
      })

  }


  montaUsuarioLogin(): UsuarioLogin {
    return {
      login: this.form.get('login').value.trim(),
      senha: this.form.get('senha').value.trim(),
    }
  }

}
