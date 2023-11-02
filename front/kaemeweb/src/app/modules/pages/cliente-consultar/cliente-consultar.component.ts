import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseFormulario } from '../../shared/classes/BaseFormulario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TipoPecaService } from '../../shared/services/tipo-peca.service';
import { PedidoService } from '../../shared/services/pedido.service';
import { MatTableDataSource } from '@angular/material/table';
import { Fornecedor } from '../../shared/models/fornecedor';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PedidoInformation } from '../../shared/models/PedidoModels/pedido-information';

@Component({
  selector: 'app-cliente-consultar',
  templateUrl: './cliente-consultar.component.html',
  styleUrls: ['./cliente-consultar.component.scss']
})
export class ClienteConsultarComponent extends BaseFormulario implements OnInit {

  displayedColumns: string[] = ['peca_codigo', 'quantidade', 'valor_peca'];
  dataSource: MatTableDataSource<PedidoInformation>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pedido: PedidoInformation[] = [];
  valor_total: number;

  override form: FormGroup = this.fb.group({
    num_pedido: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(8)]],
    cpf: ['', [Validators.required, Validators.minLength(11)]],
  })


  constructor(private router: Router,
    public override fb: FormBuilder,
    public override toastr: ToastrService,
    public override dialog: MatDialog,
    private pedidoService: PedidoService) {
    super (dialog, fb, toastr, router)

  }

  override ngOnInit() {
    this.exibirBtnCadastrar = false;
    this.exibirBtnEditar = false;
    this.redirectFechar = '/login/';
    // this.carregarTipoPecas();
  }

  override consultar(){

    const num_pedido = this.form.controls['num_pedido'].value;
    const cpf = this.form.controls['cpf'].value;

    this.pedidoService.getPedidoCliente(num_pedido, cpf)
      .subscribe(res => {
        if (res.length > 0) {
          this.pedido = res;
          this.valor_total = res[0].valor_Total;
          this.dataSource = new MatTableDataSource(res);
        } else {
          this.toastr.warning("Pedido inválido!")
        }
      }, error => {
        console.log(error);
        this.toastr.error("Erro ao consultar o pedido!")
      })
  }

}
