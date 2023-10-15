import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/modules/shared/models/cliente';
import { ClienteService } from 'src/app/modules/shared/services/cliente.service';
import { BaseFormulario } from 'src/app/modules/shared/classes/BaseFormulario';
import { CepService } from 'src/app/modules/shared/services/cep.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-dialog',
  templateUrl: './cliente-dialog.component.html',
  styleUrls: ['./cliente-dialog.component.scss']
})
export class ClienteDialogComponent extends BaseFormulario implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Cliente>;

  displayedColumns: string[] = ['nome', 'data_nasc', 'cpf'];

  override form: FormGroup = this.fb.group({
    nome: [''],
    cpf: ['']
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private dialogRef: MatDialogRef<ClienteDialogComponent>,
  public override fb: FormBuilder,
  public override toastr: ToastrService,
  public override dialog: MatDialog,
  private router: Router,
  private clienteService: ClienteService)
{ super (dialog, fb, toastr, router) }

  override ngOnInit(): void {
    this.exibirMatCardActions = false;
  }

  displayTabela = 'none'
  mudarDisplay(e: { preventDefault: () => void; }){
    e.preventDefault();
    this.displayTabela ='block';
  }

  buscarCliente(){
    const nome = this.form.controls['nome'].value ? this.form.controls['nome'].value : '';
    const cpf = this.form.controls['cpf'].value ? this.form.controls['cpf'].value : '';

    this.clienteService.getClienteBySearch(nome, cpf)
      .subscribe(clientes => {
        this.dataSource = new MatTableDataSource(clientes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.displayTabela = 'block'
      })
  }

  fecharDialog(cliente: Cliente) {
    this.dialogRef.close(cliente);
  }

}
