import { PecaService } from './../../../../shared/services/peca.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { BaseFormulario } from 'src/app/modules/shared/classes/BaseFormulario';
import { ClienteDialogComponent } from '../../cliente/cliente-dialog/cliente-dialog.component';
import { DialogComponent } from 'src/app/modules/shared/dialog/dialog.component';
import { ClienteFormComponent } from '../../cliente/cliente-form/cliente-form.component';
import { Peca } from 'src/app/modules/shared/models/peca';
import { PecaDialogComponent } from '../../estoque/peca/peca-dialog/peca-dialog.component';
import { MatTable } from '@angular/material/table';
import { PedidoPeca } from 'src/app/modules/shared/models/PedidoModels/pedido-peca';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss']
})
export class PedidoFormComponent extends BaseFormulario implements OnInit {


  formPedido: FormGroup = this.fb.group({
    cliente: ['', [Validators.required]],
    usuario: ['', [Validators.required]],
    dthr_pedido: ['', [Validators.required]]
  });

  formPeca: FormGroup = this.fb.group({
    cliente_id: ['', [Validators.required]],
    data_pedido: ['', [Validators.required]]
  });

  @ViewChild(MatTable) table: MatTable<any>;
  displayedColumnsPeca: string[] = ['codigo', 'tipo_peca', 'fornecedor', 'quantidade', 'estoque', 'valor_venda', 'btn'];
  displayedColumnsTeste: string[] = ['codigo', 'quantidade', 'valor_peca'];

  arrayPecas: Peca[] = [];

  arrayPedidoPecas: PedidoPeca[] = [];
  coco: PedidoPeca[] = [];

  constructor(private router: Router,
    public override fb: FormBuilder,
    public override toastr: ToastrService,
    public override dialog: MatDialog,
    private route: ActivatedRoute,
    private pecaService: PecaService)
    { super (dialog, fb, toastr, router) }

  override ngOnInit() {
    this.exibirBtnCadastrar = false;
    this.exibirBtnEditar = false;
    this.exibirBtnFechar = false;
    this.exibirMatCardActions = false;

    this.formPedido.controls['cliente'].disable();
    this.formPedido.controls['usuario'].setValue(localStorage.getItem("k_user").toUpperCase());
    this.formPedido.controls['dthr_pedido'].setValue(moment(new Date()).format("DD/MM/yyyy HH:mm"));
    this.formPedido.controls['usuario'].disable();
  }

  abrirDialogCliente() {
    const resultadoDialog = this.dialog.open(ClienteDialogComponent, {
      disableClose: false,
    });

    resultadoDialog.afterClosed().subscribe(cliente => {
      this.formPedido.controls['cliente'].setValue(cliente.nome);
    });
  }

  abrirDialogPeca() {
    const resultadoDialog = this.dialog.open(PecaDialogComponent, {
      disableClose: false,
    });

    resultadoDialog.afterClosed().subscribe(peca => {
      if (peca) {
        this.configPecas(peca);
      }
    });
  }

  configPecas(peca: Peca) {
    let prosseguir = true;

    if (this.arrayPecas.some(x => x.id === peca.id)) {
      this.toastr.warning("Peça já adicionada");
      prosseguir = false;
    }

    if (prosseguir) {
      this.arrayPecas.push(peca);
      this.formPeca.addControl("quantidade" + (peca.id), new FormControl(''));
      this.formPeca.controls["quantidade" + (peca.id)].setValue(1);
      this.table.renderRows();
    }

  }

  montarPedidoPeca() {

    const array: PedidoPeca[] = [];

    this.arrayPecas.forEach(peca => {
      let pedidoPeca: PedidoPeca = {
        quantidade: this.formPeca.controls["quantidade" + (peca.id)].value,
        peca_Id: peca.id,
        peca_codigo: peca.codigo,
        valor_Peca: peca.valor_Venda
      }

      array.push(pedidoPeca);
    })

    this.arrayPedidoPecas = array;
    this.table.renderRows();

  }

  removerPeca(peca: Peca) {

    this.resultadoDialog('Remover peça do pedido', 'Tem certeza que deseja continuar?')
    .subscribe((resultado) => {
      if (resultado) {
        const index = this.arrayPecas.findIndex(x => x.id === peca.id);
        this.arrayPecas.splice(index, 1);
        this.formPeca.removeControl("quantidade" + (peca.id));
        this.table.renderRows();
      }
    });

  }

  checarQuantidade(peca: Peca, event: any) {
    const quantidade = +event.target.value;
    let pecaBanco;

    this.pecaService.getPecaById(peca.id)
      .subscribe(res => {
        if (res.quantidade < quantidade) {
          this.toastr.warning("Sem quantidade no estoque!");
          this.formPeca.controls["quantidade" + (peca.id)].setValue(1);
          this.table.renderRows();
        }
      })
  }

  teste() {
    console.log(this.arrayPedidoPecas)
    this.table.renderRows();
  }

  getTotalVenda(): number {

    if (this.arrayPecas.length > 0) {

      this.arrayPecas.forEach(peca => {

      })

    let total: number = this.arrayPecas
      .map(item => this.formPeca.controls["quantidade" + (item.id)].value * item.valor_Venda)
      .reduce((a, b) => a + b, 0);

      return total;
    }

    return 0;
  }

  abrirClienteFormComponent() {
    const resultadoDialog = this.dialog.open(ClienteFormComponent, {
      disableClose: false,
    });

    resultadoDialog.afterClosed().subscribe(cliente => {

    });
  }

}
