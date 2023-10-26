import { UserService } from 'src/app/modules/shared/services/user.service';
import { PerfilService } from './../../../../shared/services/perfil.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFormulario } from 'src/app/modules/shared/classes/BaseFormulario';
import { UtilFuncoes } from 'src/app/modules/shared/classes/UtilFuncoes';
import { Usuario } from 'src/app/modules/shared/models/UsuarioModels/usuario';
import { Perfil } from 'src/app/modules/shared/models/perfil';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent extends BaseFormulario implements OnInit {

  utilFuncoes = UtilFuncoes;

  lista_perfil: Perfil[] = [];

  override form: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.maxLength(150)]],
    login: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    perfil_id: ['', [Validators.required]],
    ativo: [false, []],
  })


  constructor(private router: Router,
    public override fb: FormBuilder,
    public override toastr: ToastrService,
    public override dialog: MatDialog,
    private route: ActivatedRoute,
    private perfilService: PerfilService,
    private userService: UserService)
{ super (dialog, fb, toastr, router) }

  override ngOnInit() {

    // Caso entre para cadastrar usuario
    this.modoFormulario = 'cadastro';
    this.exibirBtnEditar = false;
    this.redirectFechar = 'gestao/usuario/home';

    if (this.router.url.includes('consultar') === true) {

      // Caso entre para consulta
      this.modoFormulario = 'consulta';
      this.exibirBtnEditar = false;
      this.exibirBtnCadastrar = false;
      this.redirectFechar = 'gestao/usuario/home';

      const id = this.route.snapshot.params['id'];
      this.userService.getUsuarioById(id)
        .subscribe(res => {
          this.carregarUsuario(res);
          this.form.disable();
        });
    }

    this.carregarPerfil();

  }

  carregarUsuario(usuario: Usuario) {
    this.form.controls['nome'].setValue(usuario.nome);
    this.form.controls['login'].setValue(usuario.login);
    this.form.controls['senha'].setValue('*****');
    this.form.controls['perfil_id'].setValue(usuario.perfil_Id);
    this.form.controls['ativo'].setValue(usuario.ativo);
  }

  carregarPerfil() {
    this.perfilService.getAllAtivos()
      .subscribe(res => {
        this.lista_perfil = res;
      })
  }

  override salvar(): void {
    debugger
    const usuario = this.montarUsuario();

    this.userService.create(usuario)
      .subscribe(res => {
        if (res) {
          this.toastr.success("Usuário cadastrado com sucesso!")
          this.router.navigate(['gestao/usuario/home']);
          this.exibirBtnCadastrar = false;
        } else {
          this.toastr.warning("Não foi possível cadastrar o usuário!")
        }
      }, error => {
        console.log(error);
        this.toastr.error("Erro ao cadastrar o usuário!")
      })
  }

  montarUsuario(): Usuario {
    return {
      login: this.utilFuncoes.hasValue(this.form.controls['login'].value) ? this.form.controls['login'].value.trim() : null,
      nome: this.utilFuncoes.hasValue(this.form.controls['nome'].value) ? this.form.controls['nome'].value.trim() : null,
      senha: this.utilFuncoes.hasValue(this.form.controls['senha'].value) ? this.form.controls['senha'].value.trim() : null,
      perfil_Id: this.form.controls['perfil_id'].value,
      data_Criacao: new Date(),
      ativo: this.form.controls['ativo'].value,
    }
  }

}
