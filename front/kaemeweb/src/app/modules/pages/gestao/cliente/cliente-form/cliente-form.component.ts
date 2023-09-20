import { UfService } from './../../../../shared/services/uf.service';
import { CepService } from '../../../../shared/services/cep.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFormulario } from 'src/app/modules/shared/classes/BaseFormulario';
import { Uf } from 'src/app/modules/shared/models/uf';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent extends BaseFormulario {


  lista_uf: Uf[] = [];

  override form: FormGroup = this.fb.group({
    // nomePac: new FormControl('', [Validators.required, Validators.minLength(6)]),
    // codMatricula: ['', { initialValueIsDefault: true }],
    // dataNasc: new FormControl('', [Validators.required]),
    // idade: [''],
    // prontuarioOrigem: ['', []],
    nome: ['', [Validators.required]],
    data_nasc: ['', [Validators.required]],
    signo: ['', []],
    cpf: ['', []],
    telefone: ['', []],
    email: ['', []],
    instagram: ['', []],
    meio_captacao: ['', []],
    cep: ['', []],
    logradouro: ['', []],
    numero: ['', []],
    complemento: ['', []],
    bairro: ['', []],
    uf: ['', []],
    sexo: ['', [Validators.required]],

  })

  constructor(private router: Router,
              private cepService: CepService,
              public override fb: FormBuilder,
              public override toastr: ToastrService,
              public override dialog: MatDialog,
              private ufService: UfService)
  { super (dialog, fb, toastr, router) }

  override ngOnInit() {
    // this.toastr.success("Entrou")
    this.carregaUf();
  }

  carregaUf() {
    this.ufService.getAll()
      .subscribe(res => {
        this.lista_uf = res;
      })
  }

  buscaCep() {
    const cep = this.form.controls['cep'].value;
    this.cepService.consultaCep(cep)
      .subscribe(res => {

        if (!res.erro) {
          this.form.controls['logradouro'].setValue(res.logradouro.toUpperCase())
          this.form.controls['bairro'].setValue(res.bairro.toUpperCase())
        } else {
          this.toastr.warning("CEP não encontrado!")
        }
        console.log(res)
      }, error => {
        console.log(error)
        this.toastr.error("Erro ao buscar CEP!")
      })
  }

}
