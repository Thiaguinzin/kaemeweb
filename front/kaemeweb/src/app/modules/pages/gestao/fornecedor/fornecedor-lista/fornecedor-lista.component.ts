import { FornecedorService } from './../../../../shared/services/fornecedor.service';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFormulario } from 'src/app/modules/shared/classes/BaseFormulario';
import { DialogComponent } from 'src/app/modules/shared/dialog/dialog.component';
import { Fornecedor } from 'src/app/modules/shared/models/fornecedor';

@Component({
  selector: 'app-fornecedor-lista',
  templateUrl: './fornecedor-lista.component.html',
  styleUrls: ['./fornecedor-lista.component.scss']
})
export class FornecedorListaComponent extends BaseFormulario {


  lista_fornecedores: Fornecedor[] = [];

  displayedColumns: string[] = ['btnConsultar', 'razao_Social', 'email', 'telefone', 'instagram', 'tipo_Frete', 'min_Pedido_Atacado', 'perc_Desc_A_Vista', 'btnEditar', 'btnExcluir'];
  dataSource: MatTableDataSource<Fornecedor>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,
    public override fb: FormBuilder,
    public override toastr: ToastrService,
    public override dialog: MatDialog,
    private fornecedorService: FornecedorService) {
    super (dialog, fb, toastr, router)

  }

  override ngOnInit() {

    this.exibirBtnCadastrar = false;
    this.exibirBtnEditar = false;
    this.carregarFornecedores();
  }


  carregarFornecedores() {

    this.fornecedorService.getAll()
    .subscribe(res => {
      console.log(res)
      this.lista_fornecedores = res;
      this.dataSource = new MatTableDataSource(res);
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  redirectEditar(fornecedor: Fornecedor) {
    this.router.navigate(['/gestao/fornecedor/'+fornecedor.id+'/editar/']);
  }

  consultarFornecedor(fornecedor: Fornecedor) {
    this.router.navigate(['/gestao/fornecedor/'+fornecedor.id+'/consultar/']);
  }

  acaoExcluir(fornecedor: Fornecedor) {

    const resultadoDialog = this.dialog.open(DialogComponent, {
      data: {
        titulo: 'Excluir fornecedor',
        corpo: 'Deseja realmente prosseguir?',
        qtdBotoes: 2
      }
    });

    resultadoDialog.afterClosed().subscribe(resultado => {
      if(resultado == true) {
        this.excluir(fornecedor);
      }
    })

  }

  excluir(fornecedor: Fornecedor) {

    this.fornecedorService.delete(fornecedor.id)
      .subscribe(res => {

        if (res) {
          this.toastr.success("Fornecedor excluido com sucesso!")
          window.location.reload();
        } else {
          this.toastr.warning("Não foi possível excluir o fornecedor!")
        }

      }, error => {
        this.toastr.error("Erro ao excluir o fornecedor!")
        console.log(error)
      })

  }

}
