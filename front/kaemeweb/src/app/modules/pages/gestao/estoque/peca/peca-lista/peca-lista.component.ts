import { ReportService } from './../../../../../shared/services/report.service';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFormulario } from 'src/app/modules/shared/classes/BaseFormulario';
import { UtilFuncoes } from 'src/app/modules/shared/classes/UtilFuncoes';
import { DialogComponent } from 'src/app/modules/shared/dialog/dialog.component';
import { Fornecedor } from 'src/app/modules/shared/models/fornecedor';
import { Peca } from 'src/app/modules/shared/models/peca';
import { TipoPeca } from 'src/app/modules/shared/models/tipo-peca';
import { FornecedorService } from 'src/app/modules/shared/services/fornecedor.service';
import { PecaService } from 'src/app/modules/shared/services/peca.service';
import { TipoPecaService } from 'src/app/modules/shared/services/tipo-peca.service';

@Component({
  selector: 'app-peca',
  templateUrl: './peca-lista.component.html',
  styleUrls: ['./peca-lista.component.scss']
})
export class PecaListaComponent extends BaseFormulario {

  lista_pecas: Peca[] = [];
  dataSource: MatTableDataSource<Peca>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  displayedColumns: string[] = ['btnConsultar', 'codigo', 'valor_compra', 'valor_venda', 'tipo_peca', 'fornecedor', 'quantidade', 'btnEditar', 'btnExcluir'];


  lista_fornecedores: Fornecedor[] = [];
  lista_tipoPecas: TipoPeca[] = [];

  btnBuscarPress: boolean = false;
  btnLimparPress: boolean = false;

  override form: FormGroup = this.fb.group({
    codigo: ['', [Validators.maxLength(50)]],
    tipo_peca_id: ['', []],
    fornecedor_id: ['', []],
    ativo: ['', []],
  });

  formQuantidade: FormGroup = this.fb.group({
    quantidade: ['', []]
  })


  constructor(private router: Router,
    public override fb: FormBuilder,
    public override toastr: ToastrService,
    public override dialog: MatDialog,
    private route: ActivatedRoute,
    private fornecedorService: FornecedorService,
    private tipoPecaService: TipoPecaService,
    private pecaService: PecaService,
    private reportService: ReportService)
  { super (dialog, fb, toastr, router) }


  override ngOnInit() {

    this.exibirBtnCadastrar = false;
    this.exibirBtnEditar = false;
    this.redirectFechar = 'gestao';

    this.carregarGetTop100();
    this.carregarFornecedor();
    this.carregarTipoPeca();

  }

  carregarGetTop100() {
    this.pecaService.getTop100()
      .subscribe(res => {
        this.lista_pecas = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      })
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  limparCampos() {
    this.btnLimparPress = true;
    this.btnBuscarPress = false;
    this.form.reset();
  }

  atualizarQuantidade(peca: Peca, event: any) {
    const novaQuantidade = +event.target.value;
    const pecaUpdate = peca;

    if (novaQuantidade != peca.quantidade) {

      const resultadoDialog = this.dialog.open(DialogComponent, {
        data: {
          titulo: "Atualizar Estoque",
          corpo: "Tem certeza que deseja atualizar o estoque?",
          qtdBotoes: 2
        }
      });

      resultadoDialog.afterClosed().subscribe(resultado => {
        if(resultado == true) {
          pecaUpdate.quantidade = novaQuantidade;
          this.pecaService.update(pecaUpdate)
            .subscribe(res => {
              if(res) {
                this.toastr.success("Quantidade editada com sucesso!");
                // this.atualizarListaPecasInExecutionTime();
              } else {
                this.toastr.warning("Erro ao editar quantidade!")
              }
            })
        } else {
          this.atualizarTabela();
        }
      });

    }

  }

  consultarPeca(peca: Peca) {
    this.router.navigate(['/gestao/estoque/peca/'+peca.id+'/consultar/']);
  }

  redirectEditar(peca: Peca) {
    this.router.navigate(['/gestao/estoque/peca/'+peca.id+'/editar/']);
  }

  toggleChange(peca: Peca, event: any) {

    if (peca.ativo) {

      const resultadoDialog = this.dialog.open(DialogComponent, {
        data: {
          titulo: 'Inativar peça',
          corpo: 'Deseja realmente prosseguir?',
          qtdBotoes: 2
        }
      });

      resultadoDialog.afterClosed().subscribe(resultado => {
        if(resultado == true) {
          peca.ativo = false;
          this.update(peca);
        } else {
          this.atualizarTabela();
        }
      });

    }
    else {
      const resultadoDialog = this.dialog.open(DialogComponent, {
        data: {
          titulo: 'Ativar peça',
          corpo: 'Deseja realmente prosseguir?',
          qtdBotoes: 2
        }
      });

      resultadoDialog.afterClosed().subscribe(resultado => {
        if(resultado == true) {
          peca.ativo = true;
          this.update(peca);
        } else {
          this.atualizarTabela();
        }
      });
    }

  }

  update(peca: Peca) {

    this.pecaService.update(peca)
      .subscribe(res => {

        if (res) {
          this.toastr.success("Peça atualizada com sucesso!")
          window.location.reload();
        } else {
          this.toastr.warning("Não foi possível atualizar a peça!")
        }

      }, error => {
        this.toastr.error("Erro ao atualizar a peça!")
        console.log(error)
      })

  }

  buscarPecas() {
    const codigo = this.form.controls['codigo'].value ? this.form.controls['codigo'].value : '';
    const tipo_peca_id = this.form.controls['tipo_peca_id'].value ? this.form.controls['tipo_peca_id'].value : '';
    const fornecedor_id = this.form.controls['fornecedor_id'].value ? this.form.controls['fornecedor_id'].value : '';
    const ativo = this.form.controls['ativo'].value === null ? '' : this.form.controls['ativo'].value;

    this.pecaService.getPecaBySearch(codigo, tipo_peca_id, fornecedor_id, true, ativo)
      .subscribe(res => {
        this.lista_pecas = res;
        this.btnLimparPress = false;
        this.btnBuscarPress = true;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
    });
  }

  atualizarTabela() {
    const codigo = this.form.controls['codigo'].value ? this.form.controls['codigo'].value : '';
    const tipo_peca_id = this.form.controls['tipo_peca_id'].value ? this.form.controls['tipo_peca_id'].value : '';
    const fornecedor_id = this.form.controls['fornecedor_id'].value ? this.form.controls['fornecedor_id'].value : '';

    if (this.btnBuscarPress && (UtilFuncoes.hasValue(codigo) || UtilFuncoes.hasValue(tipo_peca_id) || UtilFuncoes.hasValue(fornecedor_id))) {
      this.buscarPecas();
    }

    if (!this.btnBuscarPress) {
      this.carregarGetTop100();
    }

  }

}
