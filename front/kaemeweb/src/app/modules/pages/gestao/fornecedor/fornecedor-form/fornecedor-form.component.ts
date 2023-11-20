import { FornecedorService } from './../../../../shared/services/fornecedor.service';
import { TipoFreteService } from './../../../../shared/services/tipo-frete.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFormulario } from 'src/app/modules/shared/classes/BaseFormulario';
import { UtilFuncoes } from 'src/app/modules/shared/classes/UtilFuncoes';
import { Fornecedor } from 'src/app/modules/shared/models/fornecedor';
import { TipoFrete } from 'src/app/modules/shared/models/tipo-frete';
import { Uf } from 'src/app/modules/shared/models/uf';
import { UfService } from 'src/app/modules/shared/services/uf.service';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.scss']
})
export class FornecedorFormComponent extends BaseFormulario {

  utilFuncoes = UtilFuncoes;

  lista_uf: Uf[] = [];
  lista_tipoFrete: TipoFrete[] = [];

  override form: FormGroup = this.fb.group({
    razao_social: ['', [Validators.required, Validators.maxLength(100)]],
    logradouro: ['', [ Validators.maxLength(100)]],
    uf: ['', []],
    cnpj: ['', []],
    instagram: ['', [Validators.maxLength(50)]],
    email: ['', [Validators.email, Validators.maxLength(50)]],
    telefone: ['', []],
    min_pedido_atacado: ['', []],
    perc_desc_a_vista: ['', []],
    tipo_frete: ['', [Validators.required]],
  })


  constructor(private router: Router,
    public override fb: FormBuilder,
    public override toastr: ToastrService,
    public override dialog: MatDialog,
    private route: ActivatedRoute,
    private ufService: UfService,
    private tipoFreteService: TipoFreteService,
    private fornecedorService: FornecedorService)
{ super (dialog, fb, toastr, router) }

  override ngOnInit() {

    // Caso entre para cadastrar cliente
    this.modoFormulario = 'cadastro';
    this.exibirBtnEditar = false;
    this.redirectFechar = 'gestao/fornecedor';

    if (this.router.url.includes('editar') === true) {

      // Caso entre para edição
      this.modoFormulario = 'edicao';
      this.exibirBtnEditar = true;
      this.exibirBtnCadastrar = false;
      this.redirectFechar = 'gestao/fornecedor';

      const id = this.route.snapshot.params['id'];
      this.fornecedorService.getFornecedorById(id)
        .subscribe(res => {
          this.carregarFornecedor(res);
        });
    }

    if (this.router.url.includes('consultar') === true) {

      // Caso entre para consulta
      this.modoFormulario = 'consulta';
      this.exibirBtnEditar = false;
      this.exibirBtnCadastrar = false;
      this.redirectFechar = 'gestao/fornecedor';

      const id = this.route.snapshot.params['id'];
      this.fornecedorService.getFornecedorById(id)
        .subscribe(res => {
          this.carregarFornecedor(res);
          this.form.disable();
        });
    }

    this.carregarUf();
    this.carregarTipoFrete();

  }

  carregarUf() {
    this.ufService.getAll()
      .subscribe(res => {
        this.lista_uf = res;
      })
  }

  carregarTipoFrete() {
    this.tipoFreteService.getAllAtivos()
      .subscribe(res => {
        this.lista_tipoFrete = res;
      })
  }

  override salvar() {
    const fornecedor = this.montarFornecedor();

    if (this.modoFormulario === 'cadastro') {
      this.fornecedorService.create(fornecedor)
      .subscribe(res => {
        if(res) {
          super.consultar();
          this.toastr.success("Fornecedor cadastrado com sucesso!")
          this.router.navigate(['gestao/fornecedor']);
          this.exibirBtnCadastrar = false;
        } else {
          this.toastr.warning("Erro ao cadastrar o fornecedor!")
        }
      })
    }

    if (this.modoFormulario === 'edicao') {
      this.fornecedorService.update(fornecedor)
      .subscribe(res => {
        if(res) {
          super.consultar();
          this.toastr.success("Fornecedor editado com sucesso!")
          this.router.navigate(['gestao/fornecedor']);
          this.exibirBtnCadastrar = false;
        } else {
          this.toastr.warning("Erro ao editar o fornecedor!")
        }
      })
    }

  }

  montarFornecedor(): Fornecedor {
    return {
      razao_Social: this.form.controls['razao_social'].value.toString().toUpperCase(),
      logradouro: this.utilFuncoes.hasValue(this.form.controls['logradouro'].value) ? this.form.controls['logradouro'].value.toString().toUpperCase() : null,
      uf: this.utilFuncoes.hasValue(this.form.controls['uf'].value) ? this.form.controls['uf'].value : null,
      cnpj: this.utilFuncoes.hasValue(this.form.controls['cnpj'].value) ? this.form.controls['cnpj'].value.toString().toUpperCase() : null,
      instagram: this.utilFuncoes.hasValue(this.form.controls['instagram'].value) ? this.form.controls['instagram'].value : null,
      email: this.utilFuncoes.hasValue(this.form.controls['email'].value) ? this.form.controls['email'].value : null,
      telefone: this.utilFuncoes.hasValue(this.form.controls['telefone'].value) ? this.form.controls['telefone'].value.toString().toUpperCase() : null,
      min_Pedido_Atacado: this.utilFuncoes.hasValue(this.form.controls['min_pedido_atacado'].value) ? this.form.controls['min_pedido_atacado'].value: null,
      perc_Desc_A_Vista: this.utilFuncoes.hasValue(this.form.controls['perc_desc_a_vista'].value) ? this.form.controls['perc_desc_a_vista'].value : null,
      tipo_Frete_Id: this.utilFuncoes.hasValue(this.form.controls['tipo_frete'].value) ? this.form.controls['tipo_frete'].value : null,
      data_Criacao: new Date(),
      criado_Por: +localStorage.getItem('k_user_id'),

      id: this.route.snapshot.params['id']
    }
  }

  carregarFornecedor(fornecedor: Fornecedor) {
    this.form.controls['razao_social'].setValue(fornecedor.razao_Social)
    this.form.controls['logradouro'].setValue(fornecedor.logradouro)
    this.form.controls['uf'].setValue(fornecedor.uf)
    this.form.controls['cnpj'].setValue(fornecedor.cnpj)
    this.form.controls['instagram'].setValue(fornecedor.instagram)
    this.form.controls['email'].setValue(fornecedor.email)
    this.form.controls['telefone'].setValue(fornecedor.telefone)
    this.form.controls['min_pedido_atacado'].setValue(fornecedor.min_Pedido_Atacado)
    this.form.controls['perc_desc_a_vista'].setValue(fornecedor.perc_Desc_A_Vista)
    this.form.controls['tipo_frete'].setValue(fornecedor.tipo_Frete_Id)
  }


}
