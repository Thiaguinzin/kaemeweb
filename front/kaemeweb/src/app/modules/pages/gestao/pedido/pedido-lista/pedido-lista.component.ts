import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFormulario } from 'src/app/modules/shared/classes/BaseFormulario';
import { PedidoCreate } from 'src/app/modules/shared/models/PedidoModels/pedido-create';
import { ClienteDialogComponent } from '../../cliente/cliente-dialog/cliente-dialog.component';
import { Validadores } from 'src/app/modules/shared/validadores/validadores';
import { StatusPedidoService } from 'src/app/modules/shared/services/status-pedido.service';
import { StatusPedido } from 'src/app/modules/shared/models/status-pedido';
import { TipoPagamentoService } from 'src/app/modules/shared/services/tipo-pagamento.service';
import { TipoPagamento } from 'src/app/modules/shared/models/tipo-pagamento';
import { PedidoSearch } from 'src/app/modules/shared/models/PedidoModels/pedido-search';
import { UtilFuncoes } from 'src/app/modules/shared/classes/UtilFuncoes';
import * as moment from 'moment';
import { PedidoService } from 'src/app/modules/shared/services/pedido.service';
import { PedidoInformation } from 'src/app/modules/shared/models/PedidoModels/pedido-information';

@Component({
  selector: 'app-pedido-lista',
  templateUrl: './pedido-lista.component.html',
  styleUrls: ['./pedido-lista.component.scss']
})
export class PedidoListaComponent extends BaseFormulario implements OnInit {

  dataSource: MatTableDataSource<PedidoInformation>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['btnConsultar', 'num_pedido', 'cliente', 'data_pedido', 'funcionario', 'valor_pedido', 'valor_pago', 'tipo_pagamento', 'status_pedido', 'btnEditar', 'btnExcluir'];

  lista_statusPedido: StatusPedido[] = [];
  lista_tipoPagamento: TipoPagamento[] = [];

  // Etapa 1
  override form: FormGroup = this.fb.group({
    num_pedido: ['', []],
    cliente: ['', []],
    cliente_id: ['', []],
    dthr_inicio_pedido: ['', [Validadores.dataNaoFuturaValidator()]],
    dthr_fim_pedido: ['', [Validadores.dataNaoFuturaValidator()]],
    dthr_inicio_pagamento: ['', [Validadores.dataNaoFuturaValidator()]],
    dthr_fim_pagamento: ['', [Validadores.dataNaoFuturaValidator()]],
    status_pedido_id: ['', []],
    tipo_pagamento_id: ['', []],
    pago: ['', []],
  });

  constructor(private router: Router,
    public override fb: FormBuilder,
    public override toastr: ToastrService,
    public override dialog: MatDialog,
    private statusPedidoService: StatusPedidoService,
    private tipoPagamentoService: TipoPagamentoService,
    private pedidoService: PedidoService) {
    super (dialog, fb, toastr, router)

  }

  override ngOnInit() {
    this.form.controls['cliente'].disable();
    this.carregarStatusPedido();
    this.carregarTipoPagamento();
  }

  carregarStatusPedido() {
    this.statusPedidoService.getAllAtivos()
      .subscribe(res => {
        this.lista_statusPedido = res;
      }, error => {
        console.log(error);
        this.toastr.error("Erro ao consultar STATUS_PEDIDO!")
      })
  }

  carregarTipoPagamento() {
    this.tipoPagamentoService.getAllAtivos()
      .subscribe(res => {
        this.lista_tipoPagamento = res;
      },error => {
        console.log(error);
        this.toastr.error("Erro ao consultar Tipo Pagamento");
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  abrirDialogCliente() {
    const resultadoDialog = this.dialog.open(ClienteDialogComponent, {
      disableClose: false,
    });

    resultadoDialog.afterClosed().subscribe(cliente => {
      if (cliente != undefined) {
        this.form.controls['cliente'].setValue(cliente.nome);
        this.form.controls['cliente_id'].setValue(cliente.id);
      }
    });
  }

  buscarPedidos() {
    const pedidoSearch = this.montarPedidoSearch();

    this.pedidoService.getPedidoBySearch(pedidoSearch)
      .subscribe(res => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
      })
  }

  montarPedidoSearch(): PedidoSearch {
    return {
      num_Pedido: UtilFuncoes.hasValue(this.form.controls['num_pedido'].value) ? this.form.controls['num_pedido'].value : null,
      cliente_Id: UtilFuncoes.hasValue(this.form.controls['cliente_id'].value) ? this.form.controls['cliente_id'].value.toString() : null,
      // usuario_Id: UtilFuncoes.hasValue(this.form.controls['usuario_id'].value) ? this.form.controls['usuario_id'].value : null,
      data_Inicio_Pedido: UtilFuncoes.hasValue(this.form.controls['dthr_inicio_pedido'].value) ? moment(this.form.controls['dthr_inicio_pedido'].value, "DDMMYYYYHHmm").toDate() : null,
      data_Fim_Pedido: UtilFuncoes.hasValue(this.form.controls['dthr_fim_pedido'].value) ? moment(this.form.controls['dthr_fim_pedido'].value, "DDMMYYYYHHmm").toDate() : null,
      data_Inicio_Pagamento: UtilFuncoes.hasValue(this.form.controls['dthr_inicio_pagamento'].value) ? moment(this.form.controls['dthr_inicio_pagamento'].value, "DDMMYYYYHHmm").toDate() : null,
      data_Fim_Pagamento: UtilFuncoes.hasValue(this.form.controls['dthr_fim_pagamento'].value) ? moment(this.form.controls['dthr_fim_pagamento'].value, "DDMMYYYYHHmm").toDate() : null,
      status_Pedido_Id: UtilFuncoes.hasValue(this.form.controls['status_pedido_id'].value) ? this.form.controls['status_pedido_id'].value : null,
      pago: UtilFuncoes.hasValue(this.form.controls['pago'].value) ? this.form.controls['pago'].value : null,
      tipo_Pagamento_Id: UtilFuncoes.hasValue(this.form.controls['tipo_pagamento_id'].value) ? this.form.controls['tipo_pagamento_id'].value : null
    }
  }

}
