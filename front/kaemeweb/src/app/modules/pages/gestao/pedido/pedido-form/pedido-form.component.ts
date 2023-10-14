import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { BaseFormulario } from 'src/app/modules/shared/classes/BaseFormulario';
import { ClienteDialogComponent } from '../../cliente/cliente-dialog/cliente-dialog.component';
import { DialogComponent } from 'src/app/modules/shared/dialog/dialog.component';
import { ClienteFormComponent } from '../../cliente/cliente-form/cliente-form.component';

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


  constructor(private router: Router,
    public override fb: FormBuilder,
    public override toastr: ToastrService,
    public override dialog: MatDialog,
    private route: ActivatedRoute,)
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

}
