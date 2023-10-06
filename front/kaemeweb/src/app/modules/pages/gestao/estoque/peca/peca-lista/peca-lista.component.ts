import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFormulario } from 'src/app/modules/shared/classes/BaseFormulario';
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

  dataSource: MatTableDataSource<Peca>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  lista_fornecedores: Fornecedor[] = [];
  lista_tipoPecas: TipoPeca[] = [];

  override form: FormGroup = this.fb.group({
    codigo: ['', [Validators.maxLength(50)]],
    tipo_peca_id: ['', []],
    fornecedor_id: ['', []],
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

    // Caso entre para cadastrar cliente
    this.modoFormulario = 'cadastro';
    this.exibirBtnEditar = false;
    this.redirectFechar = 'gestao/estoque/peca';

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  limparCampos() {
    this.form.reset();
  }

}
