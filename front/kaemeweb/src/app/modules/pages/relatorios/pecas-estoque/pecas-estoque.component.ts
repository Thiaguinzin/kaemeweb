import { ReportService } from './../../../shared/services/report.service';
import { FornecedorService } from './../../../shared/services/fornecedor.service';
import { TipoPecaService } from './../../../shared/services/tipo-peca.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFormulario } from 'src/app/modules/shared/classes/BaseFormulario';
import { UtilFuncoes } from 'src/app/modules/shared/classes/UtilFuncoes';
import { Fornecedor } from 'src/app/modules/shared/models/fornecedor';
import { TipoPeca } from 'src/app/modules/shared/models/tipo-peca';

@Component({
  selector: 'app-pecas-estoque',
  templateUrl: './pecas-estoque.component.html',
  styleUrls: ['./pecas-estoque.component.scss']
})
export class PecasEstoqueComponent extends BaseFormulario implements OnInit {

  utilFuncoes = UtilFuncoes;

  lista_tipoPeca: TipoPeca[] = [];
  lista_fornecedor: Fornecedor[] = [];

  override form: FormGroup = this.fb.group({
    tipo_peca_id: ['', []],
    fornecedor_id: ['', []],
    ativo: [false, []],
  })


  constructor(private router: Router,
    public override fb: FormBuilder,
    public override toastr: ToastrService,
    public override dialog: MatDialog,
    private route: ActivatedRoute,
    private tipoPecaService: TipoPecaService,
    private fornecedorService: FornecedorService,
    private reportService: ReportService)
{ super (dialog, fb, toastr, router) }

  override ngOnInit() {

    this.exibirBtnCadastrar = false;
    this.exibirBtnEditar = false;
    this.exibirBtnExportar = true;


    this.carregarTipoPeca();
    this.carregarFornecedor();

  }

  carregarTipoPeca() {
    this.tipoPecaService.getAll()
      .subscribe(res => {
        this.lista_tipoPeca = res;
      })
  }

  carregarFornecedor() {
    this.fornecedorService.getAll()
      .subscribe(res => {
        this.lista_fornecedor = res;
      })
  }

  override salvar(): void {
    const tipo_peca_id = this.utilFuncoes.hasValue(this.form.controls['tipo_peca_id'].value) ? this.form.controls['tipo_peca_id'].value : '';
    const fornecedor_id = this.utilFuncoes.hasValue(this.form.controls['fornecedor_id'].value) ? this.form.controls['fornecedor_id'].value : '';

    this.getRelatorio(tipo_peca_id, fornecedor_id);
  }

  getRelatorio(tipo_peca_id: any, fornecedor_id: any) {
    this.reportService.getRelatorioEstoque('',tipo_peca_id,fornecedor_id,false)
    .subscribe(res => {
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'Pecas_Estoque.xlsx';

      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);
    });
  }

}
