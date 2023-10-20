import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFormulario } from 'src/app/modules/shared/classes/BaseFormulario';
import { PedidoCreate } from 'src/app/modules/shared/models/PedidoModels/pedido-create';

@Component({
  selector: 'app-pedido-lista',
  templateUrl: './pedido-lista.component.html',
  styleUrls: ['./pedido-lista.component.scss']
})
export class PedidoListaComponent extends BaseFormulario implements OnInit {

  dataSource: MatTableDataSource<PedidoCreate>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,
    public override fb: FormBuilder,
    public override toastr: ToastrService,
    public override dialog: MatDialog) {
    super (dialog, fb, toastr, router)

  }

  override ngOnInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
