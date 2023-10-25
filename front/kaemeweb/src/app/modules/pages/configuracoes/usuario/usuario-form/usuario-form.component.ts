import { PerfilService } from './../../../../shared/services/perfil.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFormulario } from 'src/app/modules/shared/classes/BaseFormulario';
import { UtilFuncoes } from 'src/app/modules/shared/classes/UtilFuncoes';
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
    private perfilService: PerfilService)
{ super (dialog, fb, toastr, router) }

  override ngOnInit() {

    // Caso entre para cadastrar usuario
    this.modoFormulario = 'cadastro';
    this.exibirBtnEditar = false;
    this.redirectFechar = 'gestao/usuario/home';

    this.carregarPerfil();

  }

  carregarPerfil() {
    this.perfilService.getAllAtivos()
      .subscribe(res => {
        this.lista_perfil = res;
      })
  }

}
