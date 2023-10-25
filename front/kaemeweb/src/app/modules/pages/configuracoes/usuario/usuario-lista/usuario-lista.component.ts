import { UserService } from 'src/app/modules/shared/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFormulario } from 'src/app/modules/shared/classes/BaseFormulario';
import { Usuario } from 'src/app/modules/shared/models/UsuarioModels/usuario';
import { FornecedorService } from 'src/app/modules/shared/services/fornecedor.service';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.scss']
})
export class UsuarioListaComponent extends BaseFormulario implements OnInit  {

  lista_usuarios: Usuario[] = [];

  displayedColumns: string[] = ['btnConsultar', 'login', 'nome', 'perfil', 'data_criacao', 'ativo', 'btnEditar', 'btnExcluir'];
  dataSource: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,
    public override fb: FormBuilder,
    public override toastr: ToastrService,
    public override dialog: MatDialog,
    private fornecedorService: FornecedorService,
    private userService: UserService) {
    super (dialog, fb, toastr, router)

  }

  override ngOnInit() {

    this.exibirBtnCadastrar = false;
    this.exibirBtnEditar = false;
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.userService.getUsuarioBySearch('', '', '', '')
      .subscribe(res => {
        this.lista_usuarios = res;
        this.dataSource = new MatTableDataSource(res);
        console.log(res)
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
