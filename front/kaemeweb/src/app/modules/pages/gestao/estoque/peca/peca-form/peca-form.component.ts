import { PecaService } from './../../../../../shared/services/peca.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFormulario } from 'src/app/modules/shared/classes/BaseFormulario';
import { UtilFuncoes } from 'src/app/modules/shared/classes/UtilFuncoes';
import { Fornecedor } from 'src/app/modules/shared/models/fornecedor';
import { Peca } from 'src/app/modules/shared/models/peca';
import { TipoPeca } from 'src/app/modules/shared/models/tipo-peca';
import { FornecedorService } from 'src/app/modules/shared/services/fornecedor.service';
import { TipoPecaService } from 'src/app/modules/shared/services/tipo-peca.service';

@Component({
  selector: 'app-peca-form',
  templateUrl: './peca-form.component.html',
  styleUrls: ['./peca-form.component.scss']
})
export class PecaFormComponent extends BaseFormulario {


  utilFuncoes = UtilFuncoes;

  lista_fornecedores: Fornecedor[] = [];
  lista_tipoPecas: TipoPeca[] = [];

  override form: FormGroup = this.fb.group({
    codigo: ['', [Validators.required, Validators.maxLength(50)]],
    descricao: ['', [Validators.required, Validators.maxLength(100)]],
    valor_compra: ['', [Validators.required]],
    valor_venda: ['', [Validators.required]],
    quantidade: ['', [Validators.required]],
    tipo_peca_id: ['', [Validators.required]],
    fornecedor_id: ['', [Validators.required]],
    observacao: ['', []]
  })

  constructor(private router: Router,
    public override fb: FormBuilder,
    public override toastr: ToastrService,
    public override dialog: MatDialog,
    private route: ActivatedRoute,
    private fornecedorService: FornecedorService,
    private tipoPecaService: TipoPecaService,
    private pecaService: PecaService)
  { super (dialog, fb, toastr, router) }


  override ngOnInit() {

    this.carregarFornecedor();
    this.carregarTipoPeca();

    // Caso entre para cadastrar cliente
    this.modoFormulario = 'cadastro';
    this.exibirBtnEditar = false;
    this.redirectFechar = 'gestao/estoque/peca';

    if (this.router.url.includes('consultar') === true) {

      // Caso entre para consulta
      this.modoFormulario = 'consulta';
      this.exibirBtnEditar = false;
      this.exibirBtnCadastrar = false;

      const id = this.route.snapshot.params['id'];
      this.pecaService.getPecaById(id)
        .subscribe(res => {
          this.carregarPeca(res);
          this.form.disable();
        });
    }


  }

  carregarPeca(peca: Peca) {
    this.form.controls['codigo'].setValue(peca.codigo)
    this.form.controls['descricao'].setValue(peca.descricao)
    this.form.controls['valor_compra'].setValue(peca.valor_Compra)
    this.form.controls['valor_venda'].setValue(peca.valor_Venda)
    this.form.controls['quantidade'].setValue(peca.quantidade)
    this.form.controls['tipo_peca_id'].setValue(peca.tipo_Peca_Id)
    this.form.controls['fornecedor_id'].setValue(peca.fornecedor_Id)
    this.form.controls['observacao'].setValue(peca.observacao)
  }

  carregarFornecedor() {
    this.fornecedorService.getAll()
      .subscribe(res => {
        this.lista_fornecedores = res;
      }, error => {
        this.toastr.error('Erro ao consultar fornecedores');
        console.log(error);
      })
  }

  carregarTipoPeca() {
    this.tipoPecaService.getAllAtivos()
      .subscribe(res => {
        this.lista_tipoPecas = res;
      }, error => {
        this.toastr.error('Erro ao consultar tipo peças');
        console.log(error);
      })
  }

  override salvar() {
    debugger
    const peca = this.montarPeca();

    if (this.modoFormulario === 'cadastro') {
      this.pecaService.create(peca)
        .subscribe(res => {
          if(res) {
            this.toastr.success("Peça cadastrada com sucesso!")
            this.router.navigate(['gestao/estoque/peca']);
            this.exibirBtnCadastrar = false;
            super.consultar();
          } else {
            this.toastr.warning("Erro ao cadastrar a peça!")
          }
        })
    }
  }

  montarPeca(): Peca {
    return {
      codigo: this.form.controls['codigo'].value,
      descricao: this.form.controls['descricao'].value,
      valor_Compra: this.form.controls['valor_compra'].value,
      valor_Venda: this.form.controls['valor_venda'].value,
      quantidade: this.form.controls['quantidade'].value,
      observacao: this.utilFuncoes.hasValue(this.form.controls['observacao'].value) ? this.form.controls['observacao'].value : null,
      tipo_Peca_Id: this.form.controls['tipo_peca_id'].value,
      fornecedor_Id: this.form.controls['fornecedor_id'].value,
      data_Criacao: new Date(),
      criado_Por: +localStorage.getItem('k_user_id'),
      ativo: true,

      // Caso de edição
      id: this.route.snapshot.params['id']
    }
  }

}
