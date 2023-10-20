import { FornecedorService } from './../../../../../shared/services/fornecedor.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFormulario } from 'src/app/modules/shared/classes/BaseFormulario';
import { Fornecedor } from 'src/app/modules/shared/models/fornecedor';
import { Peca } from 'src/app/modules/shared/models/peca';
import { TipoPeca } from 'src/app/modules/shared/models/tipo-peca';
import { ClienteService } from 'src/app/modules/shared/services/cliente.service';
import { PecaService } from 'src/app/modules/shared/services/peca.service';
import { TipoPecaService } from 'src/app/modules/shared/services/tipo-peca.service';

@Component({
  selector: 'app-peca-dialog',
  templateUrl: './peca-dialog.component.html',
  styleUrls: ['./peca-dialog.component.scss']
})
export class PecaDialogComponent extends BaseFormulario implements OnInit {

  displayedColumns: string[] = ['codigo', 'tipo_peca', 'valor_venda', 'fornecedor', 'quantidade'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Peca>;

  lista_fornecedores: Fornecedor[] = [];
  lista_tipoPecas: TipoPeca[] = [];

  override form: FormGroup = this.fb.group({
    codigo: [''],
    tipo_peca_id: [''],
    fornecedor_id: [''],
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private dialogRef: MatDialogRef<PecaDialogComponent>,
  public override fb: FormBuilder,
  public override toastr: ToastrService,
  public override dialog: MatDialog,
  private router: Router,
  private fornecedorService: FornecedorService,
  private tipoPecaService: TipoPecaService,
  private pecaService: PecaService)
  { super (dialog, fb, toastr, router) }

  displayTabela = 'none'
  mudarDisplay(e: { preventDefault: () => void; }){
    e.preventDefault();
    this.displayTabela ='block';
  }
  override ngOnInit(): void {
    this.exibirMatCardActions = false;

    this.carregarFornecedor();
    this.carregarTipoPeca();
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

  fecharDialog(peca: Peca) {
    this.dialogRef.close(peca);
  }

  buscarPecas() {
    const codigo = this.form.controls['codigo'].value ? this.form.controls['codigo'].value : '';
    const tipo_peca_id = this.form.controls['tipo_peca_id'].value ? this.form.controls['tipo_peca_id'].value : '';
    const fornecedor_id = this.form.controls['fornecedor_id'].value ? this.form.controls['fornecedor_id'].value : '';

    this.pecaService.getPecaBySearch(codigo, tipo_peca_id, fornecedor_id, true)
      .subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.displayTabela = 'block'
    });
  }

}
