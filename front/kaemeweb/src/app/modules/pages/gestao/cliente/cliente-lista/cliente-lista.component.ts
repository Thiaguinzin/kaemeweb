import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFormulario } from 'src/app/modules/shared/classes/BaseFormulario';
import { DialogComponent } from 'src/app/modules/shared/dialog/dialog.component';
import { Cliente } from 'src/app/modules/shared/models/cliente';
import { ClienteService } from 'src/app/modules/shared/services/cliente.service';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.scss']
})
export class ClienteListaComponent extends BaseFormulario {


  lista_clientes: Cliente[] = [];

  displayedColumns: string[] = ['btnConsultar', 'nome', 'data_nasc', 'telefone', 'email', 'instagram', 'btnEditar', 'btnExcluir'];
  dataSource: MatTableDataSource<Cliente>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,
    public override fb: FormBuilder,
    public override toastr: ToastrService,
    public override dialog: MatDialog,
    private clienteService: ClienteService) {
    super (dialog, fb, toastr, router)

  }

  override ngOnInit() {

    this.exibirBtnCadastrar = false;
    this.exibirBtnEditar = false;

    this.clienteService.getAllTop()
      .subscribe(res => {
        console.log(res);
        this.lista_clientes = res;
        this.dataSource = new MatTableDataSource(res);
      });
  }

  ngAfterViewInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  redirectEditar(cliente: Cliente) {
    // console.log(cliente)
    this.router.navigate(['/gestao/cliente/'+cliente.id+'/editar/']);
  }

  acaoExcluir(cliente: Cliente) {

    const resultadoDialog = this.dialog.open(DialogComponent, {
      data: {
        titulo: 'Excluir cliente',
        corpo: 'Deseja realmente prosseguir?',
        qtdBotoes: 2
      }
    });

    resultadoDialog.afterClosed().subscribe(resultado => {
      if(resultado == true) {
        this.excluir(cliente);
      }
    })

  }

  excluir(cliente: Cliente) {

    this.clienteService.delete(cliente.id)
      .subscribe(res => {

        if (res) {
          this.toastr.success("Cliente excluido com sucesso!")
          window.location.reload();
        } else {
          this.toastr.warning("Não foi possível excluir o cliente!")
        }

      }, error => {
        this.toastr.error("Erro ao excluir o cliente!")
        console.log(error)
      })

  }

  consultarCliente(cliente: Cliente) {
    this.router.navigate(['/gestao/cliente/'+cliente.id+'/consultar/']);
  }

}
