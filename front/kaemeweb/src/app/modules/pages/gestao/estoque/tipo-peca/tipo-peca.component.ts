import { TipoPecaService } from './../../../../shared/services/tipo-peca.service';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFormulario } from 'src/app/modules/shared/classes/BaseFormulario';
import { UtilFuncoes } from 'src/app/modules/shared/classes/UtilFuncoes';
import { DialogComponent } from 'src/app/modules/shared/dialog/dialog.component';
import { TipoPeca } from 'src/app/modules/shared/models/tipo-peca';

@Component({
  selector: 'app-tipo-peca',
  templateUrl: './tipo-peca.component.html',
  styleUrls: ['./tipo-peca.component.scss']
})
export class TipoPecaComponent extends BaseFormulario {

  lista_tipoPecas: TipoPeca[] = [];

  displayedColumns: string[] = ['codigo', 'descricao', 'ativo', 'btnExcluir'];
  dataSource: MatTableDataSource<TipoPeca>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  override form: FormGroup = this.fb.group({
    codigo: ['', [Validators.required, Validators.maxLength(20)]],
    descricao: ['', [Validators.required, Validators.maxLength(50)]],
  })


  constructor(private router: Router,
    public override fb: FormBuilder,
    public override toastr: ToastrService,
    public override dialog: MatDialog,
    private tipoPecaService: TipoPecaService) {
    super (dialog, fb, toastr, router)

  }

  override ngOnInit() {
    this.exibirBtnCadastrar = false;
    this.exibirBtnEditar = false;
    this.carregarTipoPecas();
  }

  carregarTipoPecas() {
    this.tipoPecaService.getAll()
      .subscribe(res => {
        this.lista_tipoPecas = res;
        console.log(res)
        this.dataSource = new MatTableDataSource(res);
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  override salvar(): void {
    const tipo_peca: TipoPeca = {
      codigo: this.form.controls['codigo'].value.trim().toUpperCase(),
      descricao: this.form.controls['descricao'].value.trim().toUpperCase(),
      ativo: true
    }

    this.tipoPecaService.create(tipo_peca)
      .subscribe(res => {
        if(res) {
          this.toastr.success("Tipo peça cadastrada com sucesso!")
          window.location.reload();
          this.exibirBtnCadastrar = false;
          super.consultar();
        } else {
          this.toastr.warning("Erro ao cadastrar Tipo peça!")
        }
      })
  }

  acaoExcluir(tipoPeca: TipoPeca) {

    const resultadoDialog = this.dialog.open(DialogComponent, {
      data: {
        titulo: 'Excluir peça',
        corpo: 'Deseja realmente prosseguir?',
        qtdBotoes: 2
      }
    });

    resultadoDialog.afterClosed().subscribe(resultado => {
      if(resultado == true) {
        this.excluir(tipoPeca);
      }
    })

  }

  excluir(tipoPeca: TipoPeca) {

    this.tipoPecaService.delete(tipoPeca.id)
      .subscribe(res => {

        if (res) {
          this.toastr.success("Tipo Peça excluida com sucesso!")
          window.location.reload();
        } else {
          this.toastr.warning("Não foi possível excluir a tipo peça!")
        }

      }, error => {
        this.toastr.error("Erro ao excluir a tipo peça!")
        console.log(error)
      })

  }


  toggleChange(tipo_peca: TipoPeca, event: any) {

    if (tipo_peca.ativo) {

      const resultadoDialog = this.dialog.open(DialogComponent, {
        data: {
          titulo: 'Inativar tipo peça',
          corpo: 'Deseja realmente prosseguir?',
          qtdBotoes: 2
        }
      });

      resultadoDialog.afterClosed().subscribe(resultado => {
        if(resultado == true) {
          tipo_peca.ativo = false;
          this.update(tipo_peca);
        } else {
          this.carregarTipoPecas();
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
          tipo_peca.ativo = true;
          this.update(tipo_peca);
        } else {
          this.carregarTipoPecas();
        }
      });
    }

  }

  update(tipo_peca: TipoPeca) {

    this.tipoPecaService.update(tipo_peca)
      .subscribe(res => {

        if (res) {
          this.toastr.success("Tipo peça atualizada com sucesso!")
        } else {
          this.toastr.warning("Não foi possível atualizar tipo peça!")
          this.carregarTipoPecas();
        }

      }, error => {
        this.toastr.error("Erro ao atualizar tipo peça!")
        console.log(error)
        this.carregarTipoPecas();
      })

  }

}
