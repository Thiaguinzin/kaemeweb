import { UserService } from 'src/app/modules/shared/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFormulario } from 'src/app/modules/shared/classes/BaseFormulario';
import { Usuario } from 'src/app/modules/shared/models/UsuarioModels/usuario';
import { FornecedorService } from 'src/app/modules/shared/services/fornecedor.service';
import { DialogComponent } from 'src/app/modules/shared/dialog/dialog.component';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.scss']
})
export class UsuarioListaComponent extends BaseFormulario implements OnInit  {

  lista_usuarios: Usuario[] = [];

  displayedColumns: string[] = ['btnConsultar', 'login', 'nome', 'perfil', 'data_criacao', 'ativo', 'btnExcluir'];
  dataSource: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,
    public override fb: FormBuilder,
    private route: ActivatedRoute,
    public override toastr: ToastrService,
    public override dialog: MatDialog,
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
        this.dataSource.paginator = this.paginator;
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

  toggleChange(usuario: Usuario, event: any) {

    if (usuario.ativo) {

      const resultadoDialog = this.dialog.open(DialogComponent, {
        data: {
          titulo: 'Inativar usuário',
          corpo: 'Deseja realmente prosseguir?',
          qtdBotoes: 2
        }
      });

      resultadoDialog.afterClosed().subscribe(resultado => {
        if(resultado == true) {
          usuario.ativo = false;
          this.update(usuario);
        } else {
          this.carregarUsuarios();
        }
      });

    }
    else {
      const resultadoDialog = this.dialog.open(DialogComponent, {
        data: {
          titulo: 'Ativar usuário',
          corpo: 'Deseja realmente prosseguir?',
          qtdBotoes: 2
        }
      });

      resultadoDialog.afterClosed().subscribe(resultado => {
        if(resultado == true) {
          usuario.ativo = true;
          this.update(usuario);
        } else {
          this.carregarUsuarios();
        }
      });
    }

  }

  update(usuario: Usuario) {

    this.userService.update(usuario)
      .subscribe(res => {

        if (res) {
          this.toastr.success("Usuário atualizado com sucesso!")
          window.location.reload();
        } else {
          this.toastr.warning("Não foi possível atualizar o usuário!")
        }

      }, error => {
        this.toastr.error("Erro ao atualizar o usuário!")
        console.log(error)
      })

  }

  consultarUsuario(usuario: Usuario) {
    this.router.navigate(['/gestao/usuario/'+usuario.id+'/consultar/']);
  }

  acaoExcluir(usuario: Usuario) {

    const resultadoDialog = this.dialog.open(DialogComponent, {
      data: {
        titulo: 'Excluir usuário',
        corpo: 'Deseja realmente prosseguir?',
        qtdBotoes: 2
      }
    });

    resultadoDialog.afterClosed().subscribe(resultado => {
      if(resultado == true) {
        this.excluir(usuario);
      }
    })

  }

  excluir(usuario: Usuario) {

    this.userService.delete(usuario.id)
      .subscribe(res => {

        if (res) {
          this.toastr.success("Usuário excluido com sucesso!")
          window.location.reload();
        } else {
          this.toastr.warning("Não foi possível excluir o usuário!")
        }

      }, error => {
        this.toastr.error("Erro ao excluir o usuário!")
        console.log(error)
      })

  }

}
