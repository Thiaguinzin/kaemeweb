import { PecaService } from './../../../../shared/services/peca.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  displayedColumnsPeca: string[] = ['id','codigo', 'tipo_peca', 'valor_venda', 'fornecedor', 'quantidade', 'btn'];

  arrayPecas: Peca[] = [];
  arrayPecasClone: Peca[] = [];

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
      this.arrayPecasClone = this.arrayPecas;
      this.table.renderRows();
    }

  }

  removerPeca(peca: Peca) {

    this.resultadoDialog('Remover peça do pedido', 'Tem certeza que deseja continuar?')
    .subscribe((resultado) => {
      if (resultado) {
        const index = this.arrayPecas.findIndex(x => x.id === peca.id);
        this.arrayPecas.splice(index, 1);
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
          debugger
          this.toastr.warning("Sem quantidade no estoque!");
          this.arrayPecas = [];
          this.table.renderRows();
        }
      })
  }

  teste() {
    console.log(this.arrayPecas)
  }

}
