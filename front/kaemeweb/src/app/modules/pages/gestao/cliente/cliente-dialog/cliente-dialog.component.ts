import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/modules/shared/models/cliente';
import { ClienteService } from 'src/app/modules/shared/services/cliente.service';

@Component({
  selector: 'app-cliente-dialog',
  templateUrl: './cliente-dialog.component.html',
  styleUrls: ['./cliente-dialog.component.scss']
})
export class ClienteDialogComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Cliente>;

  displayedColumns: string[] = ['nome', 'data_nasc', 'cpf'];

  form: FormGroup = this.fb.group({
    nome: [''],
    cpf: ['']
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<ClienteDialogComponent>,
    private fb: FormBuilder,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {

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
