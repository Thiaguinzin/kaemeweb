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
import { DialogComponent } from '../../shared/dialog/dialog.component';

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
    this.nomeBtnPersonalizado = 'Confirmar Recebimento'
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
          this.dataSource.paginator = this.paginator;

          // Caso o pedido seja diferente de confirmado, então o botão para confirmar é mostrado ao cliente
          if (res[0].status_Pedido_Id != 5) {
            this.exibirBtnPersonalizado = true;
          }

        } else {
          this.toastr.warning("Pedido inválido!")
        }
      }, error => {
        console.log(error);
        this.toastr.error("Erro ao consultar o pedido!")
      })
  }

  override salvar() {

    const resultadoDialog = this.dialog.open(DialogComponent, {
      data: {
        titulo: 'Confirmar Recebimento',
        corpo: 'Deseja realmente prosseguir?',
        qtdBotoes: 2
      }
    });

    resultadoDialog.afterClosed().subscribe(resultado => {
      if(resultado == true) {
        this.pedidoService.confirmarRecebimento(this.pedido[0].num_Pedido)
          .subscribe(res => {
            if (res) {
              this.toastr.success("Pedido confirmado com sucesso!");
              this.reloadPedido();
              this.exibirBtnPersonalizado = false;
            } else {
              this.toastr.success("Não foi possível confirmar o pedido!");
            }
          }, error => {
            console.log(error);
            this.toastr.warning("Erro ao confirmar o pedido!")
          })
      }
    })

  }

  reloadPedido() {
    this.pedidoService.getPedidoCliente(this.pedido[0].num_Pedido, this.pedido[0].cpf)
      .subscribe(res => {
        if (res.length > 0) {
          this.pedido = res;
          this.valor_total = res[0].valor_Total;
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;

          // Caso o pedido seja diferente de confirmado, então o botão para confirmar é mostrado ao cliente
          if (res[0].status_Pedido_Id != 5) {
            this.exibirBtnPersonalizado = true;
          }

        } else {
          this.toastr.warning("Pedido inválido!")
        }
      }, error => {
        console.log(error);
        this.toastr.error("Erro ao consultar o pedido!")
      })
  }

}
