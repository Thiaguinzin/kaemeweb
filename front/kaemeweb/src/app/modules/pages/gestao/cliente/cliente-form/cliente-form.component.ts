import { ClienteService } from './../../../../shared/services/cliente.service';
import { UtilFuncoes } from './../../../../shared/classes/UtilFuncoes';
import { UfService } from './../../../../shared/services/uf.service';
import { CepService } from '../../../../shared/services/cep.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFormulario } from 'src/app/modules/shared/classes/BaseFormulario';
import { Uf } from 'src/app/modules/shared/models/uf';
import { Cliente } from 'src/app/modules/shared/models/cliente';
import * as moment from 'moment';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent extends BaseFormulario {

  utilFuncoes = UtilFuncoes;

  lista_uf: Uf[] = [];

  override form: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.maxLength(200)]],
    data_nasc: ['', []],
    signo: ['', []],
    cpf: ['', []],
    telefone: ['', []],
    email: ['', [Validators.email, Validators.maxLength(50)]],
    instagram: ['', [Validators.maxLength(50)]],
    meio_captacao: ['', []],
    cep: ['', []],
    logradouro: ['', [ Validators.maxLength(100)]],
    numero: ['', [ Validators.maxLength(5)]],
    complemento: ['', [Validators.maxLength(30)]],
    bairro: ['', [Validators.maxLength(50)]],
    cidade: ['', [Validators.maxLength(50)]],
    uf: ['', []],
    sexo: ['', [Validators.required]],

  })

  constructor(private router: Router,
              private cepService: CepService,
              public override fb: FormBuilder,
              public override toastr: ToastrService,
              public override dialog: MatDialog,
              private route: ActivatedRoute,
              private ufService: UfService,
              private clienteService: ClienteService)
  { super (dialog, fb, toastr, router) }

  override ngOnInit() {
    this.carregarUf();
    this.form.controls['signo'].disable();

    // Caso entre para cadastrar cliente
    this.modoFormulario = 'cadastro';
    this.exibirBtnEditar = false;
    this.redirectFechar = 'gestao/cliente';

    if (this.router.url.includes('editar') === true) {

      // Caso entre para edição
      this.modoFormulario = 'edicao';
      this.exibirBtnEditar = true;
      this.exibirBtnCadastrar = false;
      this.redirectFechar = 'gestao/cliente';

      const id = this.route.snapshot.params['id'];
      this.clienteService.getClienteById(id)
        .subscribe(res => {
          this.carregarCliente(res);
        });
    }

    if (this.router.url.includes('consultar') === true) {

      // Caso entre para edição
      this.modoFormulario = 'consulta';
      this.exibirBtnEditar = false;
      this.exibirBtnCadastrar = false;
      this.redirectFechar = 'gestao/cliente';

      const id = this.route.snapshot.params['id'];
      this.clienteService.getClienteById(id)
        .subscribe(res => {
          this.carregarCliente(res);
          this.form.disable();
        });
    }

  }

  carregarCliente(res: Cliente) {
    this.form.controls['nome'].setValue(res.nome);
    this.form.controls['cpf'].setValue(res.cpf);
    this.form.controls['data_nasc'].setValue(moment(res.data_Nasc).format("DD/MM/YYYY"));
    this.form.controls['signo'].setValue(res.signo);
    this.form.controls['telefone'].setValue(res.telefone);
    this.form.controls['email'].setValue(res.email);
    this.form.controls['instagram'].setValue(res.instagram);
    this.form.controls['meio_captacao'].setValue(res.meio_Captacao);
    this.form.controls['cep'].setValue(res.cep);
    this.form.controls['logradouro'].setValue(res.logradouro);
    this.form.controls['numero'].setValue(res.numero);
    this.form.controls['complemento'].setValue(res.complemento);
    this.form.controls['bairro'].setValue(res.bairro);
    this.form.controls['cidade'].setValue(res.cidade);
    this.form.controls['uf'].setValue(res.uf);
    this.form.controls['sexo'].setValue(res.sexo);
  }

  carregarUf() {
    this.ufService.getAll()
      .subscribe(res => {
        this.lista_uf = res;
      })
  }

  buscarCep() {
    const cep = this.form.controls['cep'].value;
    this.cepService.consultarCep(cep)
      .subscribe(res => {

        if (!res.erro) {
          this.form.controls['logradouro'].setValue(res.logradouro.toUpperCase())
          this.form.controls['bairro'].setValue(res.bairro.toUpperCase())
          this.form.controls['cidade'].setValue(res.localidade.toUpperCase())
        } else {
          this.toastr.warning("CEP não encontrado!")
        }
        console.log(res)
      }, error => {
        console.log(error)
        this.toastr.error("Erro ao buscar CEP!")
      })
  }

  override salvar() {

    if (this.modoFormulario === 'cadastro') {
      const cliente = this.montarCliente();
      this.clienteService.create(cliente)
        .subscribe(res => {

          if(res) {
            this.toastr.success("Cliente cadastrado com sucesso!")
            this.router.navigate(['gestao/cliente']);
            this.exibirBtnCadastrar = false;
            super.consultar();
          } else {
            this.toastr.warning("Erro ao cadastrar o cliente!")
          }

        })
    }

    if (this.modoFormulario === 'edicao') {
      const cliente = this.montarCliente();
      this.clienteService.update(cliente)
        .subscribe(res => {

          if(res) {
            this.toastr.success("Cliente editado com sucesso!")
            this.router.navigate(['gestao/cliente']);
            this.exibirBtnCadastrar = false;
            super.consultar();
          } else {
            this.toastr.warning("Erro ao editar o cliente!")
          }

        })
    }


  }

  montarCliente(): Cliente {
    return {
      nome: this.form.controls['nome'].value.toString().toUpperCase(),
      cpf: this.utilFuncoes.hasValue(this.form.controls['cpf'].value) ? this.form.controls['cpf'].value.toString().toUpperCase() : null,
      data_Nasc: this.utilFuncoes.hasValue(this.form.controls['data_nasc'].value) ? moment(this.form.controls['data_nasc'].value, "DD/MM/yyyy").toDate() : null,
      signo: this.utilFuncoes.hasValue(this.form.controls['signo'].value) ? this.form.controls['signo'].value.toString().toUpperCase() : null,
      telefone: this.utilFuncoes.hasValue(this.form.controls['telefone'].value) ? this.form.controls['telefone'].value.toString().toUpperCase() : null,
      email: this.utilFuncoes.hasValue(this.form.controls['email'].value) ? this.form.controls['email'].value : null,
      instagram: this.utilFuncoes.hasValue(this.form.controls['instagram'].value) ? this.form.controls['instagram'].value : null,
      meio_Captacao: this.utilFuncoes.hasValue(this.form.controls['meio_captacao'].value) ? this.form.controls['meio_captacao'].value.toString().toUpperCase() : null,
      cep: this.utilFuncoes.hasValue(this.form.controls['cep'].value) ? this.form.controls['cep'].value : null,
      logradouro: this.utilFuncoes.hasValue(this.form.controls['logradouro'].value) ? this.form.controls['logradouro'].value.toString().toUpperCase() : null,
      numero: this.utilFuncoes.hasValue(this.form.controls['numero'].value) ? this.form.controls['numero'].value : null,
      complemento: this.utilFuncoes.hasValue(this.form.controls['complemento'].value) ? this.form.controls['complemento'].value.toString().toUpperCase() : null,
      bairro: this.utilFuncoes.hasValue(this.form.controls['bairro'].value) ? this.form.controls['bairro'].value.toString().toUpperCase() : null,
      cidade: this.utilFuncoes.hasValue(this.form.controls['cidade'].value) ? this.form.controls['cidade'].value.toString().toUpperCase() : null,
      uf: this.utilFuncoes.hasValue(this.form.controls['uf'].value) ? this.form.controls['uf'].value : null,
      sexo: this.utilFuncoes.hasValue(this.form.controls['sexo'].value) ? this.form.controls['sexo'].value.toString().toUpperCase() : null,

      data_Criacao: new Date(),
      criado_Por: +localStorage.getItem('k_user_id'),

      id: this.route.snapshot.params['id']
    }

  }

  getSigno() {

    const data_nasc = this.utilFuncoes.hasValue(this.form.controls['data_nasc'].value) ? moment(this.form.controls['data_nasc'].value, "DD/MM/yyyy").toDate() : null;

    if (moment.isDate(data_nasc)) {
      const signo = this.utilFuncoes.getSigno(data_nasc);
      this.form.controls['signo'].setValue(signo)
    }


  }

}
