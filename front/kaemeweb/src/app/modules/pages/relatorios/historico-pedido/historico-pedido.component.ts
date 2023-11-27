import { PedidoSearch } from './../../../shared/models/PedidoModels/pedido-search';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { ReportService } from '../../../shared/services/report.service';
import { FornecedorService } from '../../../shared/services/fornecedor.service';
import { TipoPecaService } from '../../../shared/services/tipo-peca.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFormulario } from 'src/app/modules/shared/classes/BaseFormulario';
import { UtilFuncoes } from 'src/app/modules/shared/classes/UtilFuncoes';
import { Fornecedor } from 'src/app/modules/shared/models/fornecedor';
import { TipoPeca } from 'src/app/modules/shared/models/tipo-peca';
import { Validadores } from 'src/app/modules/shared/validadores/validadores';
import { ClienteDialogComponent } from '../../gestao/cliente/cliente-dialog/cliente-dialog.component';
import { Usuario } from 'src/app/modules/shared/models/UsuarioModels/usuario';
import * as moment from 'moment';

@Component({
  selector: 'app-historico-pedido',
  templateUrl: './historico-pedido.component.html',
  styleUrls: ['./historico-pedido.component.scss']
})
export class HistoricoPedidoComponent extends BaseFormulario implements OnInit {

  utilFuncoes = UtilFuncoes;

  lista_usuario: Usuario[] = [];
  lista_fornecedor: Fornecedor[] = [];

  cliente_id: string;

  override form: FormGroup = this.fb.group({
    dthr_inicio_pedido: ['', [Validadores.dataNaoFuturaValidator()]],
    dthr_fim_pedido: ['', [Validadores.dataNaoFuturaValidator()]],
    dthr_inicio_pagamento: ['', [Validadores.dataNaoFuturaValidator()]],
    dthr_fim_pagamento: ['', [Validadores.dataNaoFuturaValidator()]],
    cliente: ['',[]],
    usuario_id: ['',[]],
  })


  constructor(private router: Router,
    public override fb: FormBuilder,
    public override toastr: ToastrService,
    public override dialog: MatDialog,
    private route: ActivatedRoute,
    private tipoPecaService: TipoPecaService,
    private fornecedorService: FornecedorService,
    private reportService: ReportService,
    private userService: UserService)
{ super (dialog, fb, toastr, router) }

  override ngOnInit() {

    this.exibirBtnCadastrar = false;
    this.exibirBtnEditar = false;
    this.exibirBtnExportar = true;

    this.form.controls['cliente'].disable();

    this.carregarUsuario();

  }

  carregarUsuario() {
    this.userService.getAll()
      .subscribe(res => {
        this.lista_usuario = res;
      })
  }


  override salvar(): void {
    var pedidoSearch = this.montarPedidoSearch();

    this.getRelatorio(pedidoSearch);
  }

  montarPedidoSearch(): PedidoSearch {
    return {
      data_Inicio_Pedido: this.utilFuncoes.hasValue(this.form.controls['dthr_inicio_pedido'].value) ? moment(this.form.controls['dthr_inicio_pedido'].value, "DDMMYYYYHHmm").toDate() : null,
      data_Fim_Pedido: this.utilFuncoes.hasValue(this.form.controls['dthr_fim_pedido'].value) ? moment(this.form.controls['dthr_fim_pedido'].value, "DDMMYYYYHHmm").toDate() : null,
      data_Inicio_Pagamento: this.utilFuncoes.hasValue(this.form.controls['dthr_inicio_pagamento'].value) ? moment(this.form.controls['dthr_inicio_pagamento'].value, "DDMMYYYYHHmm").toDate() : null,
      data_Fim_Pagamento: this.utilFuncoes.hasValue(this.form.controls['dthr_fim_pagamento'].value) ? moment(this.form.controls['dthr_fim_pagamento'].value, "DDMMYYYYHHmm").toDate() : null,
      cliente_Id: this.utilFuncoes.hasValue(this.cliente_id) ? this.cliente_id.toString() : '',
      usuario_Id: this.utilFuncoes.hasValue(this.form.controls['usuario_id'].value) ? this.form.controls['usuario_id'].value.toString() : ''
    }
  }

  getRelatorio(pedidoSearch: PedidoSearch) {
    this.reportService.getHistoricoPedido(pedidoSearch)
    .subscribe(res => {
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);

      const data = new Date();

      const a = document.createElement('a');
      a.href = url;
      a.download = `Historico_Pedido_${moment(data).format("DD-MM-yyyy")}.xlsx`;

      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);
    });
  }

  abrirDialogCliente() {
    const resultadoDialog = this.dialog.open(ClienteDialogComponent, {
      disableClose: false,
    });

    resultadoDialog.afterClosed().subscribe(cliente => {
      if (cliente != undefined) {
        this.form.controls['cliente'].setValue(cliente.nome);
        this.cliente_id = cliente.id;
      }
    });
  }

  limparCamposBuscar() {
    this.form.reset();
  }

}
