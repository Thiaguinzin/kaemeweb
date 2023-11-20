import { UtilFuncoes } from 'src/app/modules/shared/classes/UtilFuncoes';
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
import { TipoPagamento } from 'src/app/modules/shared/models/tipo-pagamento';
import { TipoPagamentoService } from 'src/app/modules/shared/services/tipo-pagamento.service';
import { PedidoCreate } from 'src/app/modules/shared/models/PedidoModels/pedido-create';
import { Pedido } from 'src/app/modules/shared/models/PedidoModels/pedido';
import { PedidoCobranca } from 'src/app/modules/shared/models/PedidoModels/pedido-cobranca';
import { PedidoService } from 'src/app/modules/shared/services/pedido.service';
import { Validadores } from 'src/app/modules/shared/validadores/validadores';
import { RelReciboPedidoComponent } from 'src/app/modules/shared/reports/recibo-pedido/recibo-pedido.component';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss']
})
export class PedidoFormComponent extends BaseFormulario implements OnInit {

  utilFuncoes = UtilFuncoes;
  // Etapa 1
  formPedido: FormGroup = this.fb.group({
    cliente: ['', [Validators.required]],
    usuario: ['', [Validators.required]],
    dthr_pedido: ['', [Validators.required, Validadores.dataNaoFuturaValidator()]]
  });

  clienteSelecionado: boolean = false;

  // Etapa 2
  formPeca: FormGroup = this.fb.group({
  });

  // Etapa 3
  formPagamento: FormGroup = this.fb.group({
    desconto_perc: ['', []],
    tipo_pagamento: ['', [Validators.required]],
    parcelas: ['', []],
    pago: [false, []],
    valor_pago: ['', [Validators.required]],
    data_pagamento: ['', [Validators.required, Validadores.dataNaoFuturaValidator()]],
  });

  // Usados para resumo do pedido
  cliente_id: number;
  nome_cliente: string;
  data_nasc: Date;
  cpf: string;
  valor_pedido: number;

  @ViewChild(MatTable) table: MatTable<any>;
  displayedColumnsPeca: string[] = ['codigo', 'tipo_peca', 'fornecedor', 'quantidade', 'estoque', 'valor_venda', 'btn'];
  stepperLinear: boolean = true;

  pedido: Pedido;
  arrayPecas: Peca[] = [];
  arrayPedidoPecas: PedidoPeca[] = [];
  total_venda: number

  lista_tipoPagamento: TipoPagamento[] = [];

  modoConsulta: boolean = false;
  pedidoCreateReturn: PedidoCreate;
  baixa: boolean = false;
  pedidoPago: boolean = false;

  constructor(private router: Router,
    public override fb: FormBuilder,
    public override toastr: ToastrService,
    public override dialog: MatDialog,
    private route: ActivatedRoute,
    private pecaService: PecaService,
    private tipoPagamentoService: TipoPagamentoService,
    private pedidoService: PedidoService)
    { super (dialog, fb, toastr, router)

      // Recupera valor do parâmetro
      this.route.queryParams
      .subscribe(params => {
        if (params['baixa'] === 'true') {
          this.baixa = true;
        }
      });

    }

  override ngOnInit() {


    this.exibirBtnCadastrar = false;
    this.exibirBtnEditar = false;
    this.exibirBtnFechar = false;
    this.exibirMatCardActions = false;

    this.formPedido.controls['cliente'].disable();
    this.formPedido.controls['usuario'].setValue(localStorage.getItem("k_user").toUpperCase());
    this.formPedido.controls['dthr_pedido'].setValue(moment(new Date()).format("DD/MM/yyyy HH:mm"));
    this.formPedido.controls['usuario'].disable();
    this.formPagamento.controls['valor_pago'].disable();
    this.formPagamento.controls['data_pagamento'].disable();

    if (this.router.url.includes('consultar') === true) {

      // Caso entre para consulta
      this.modoFormulario = 'consulta';
      this.exibirBtnEditar = false;
      this.exibirBtnCadastrar = false;
      this.redirectFechar = 'gestao/fornecedor';

      const num_pedido = this.route.snapshot.params['id'];
      this.pedidoService.getPedidoByNumPedido(num_pedido)
        .subscribe(res => {
          console.log(res);
          this.pedidoCreateReturn = res;
          this.stepperLinear = false;
          this.modoConsulta = true;
          this.carregarPedido(res);
        });
    }

    this.carregarTipoPagamento();
  }

  carregarPedido(pedido: PedidoCreate) {
    this.formPedido.controls['cliente'].setValue(pedido.pedido.cliente);
    this.nome_cliente = pedido.pedido.cliente;
    this.data_nasc = pedido.pedido.data_Nasc;
    this.formPedido.controls['usuario'].setValue(pedido.pedido.usuario);
    this.formPedido.controls['dthr_pedido'].setValue(moment(pedido.pedido.data_Pedido).format("DD/MM/yyyy HH:mm"));

    this.arrayPedidoPecas = pedido.pecas;
    this.formPagamento.controls['tipo_pagamento'].setValue(pedido.pedido_Cobranca.tipo_Pagamento_Id);
    this.formPagamento.controls['parcelas'].setValue(pedido.pedido_Cobranca.parcelas);
    this.formPagamento.controls['pago'].setValue(pedido.pedido_Cobranca.pago);
    this.pedidoPago = this.formPagamento.controls['pago'].value;
    this.formPagamento.controls['valor_pago'].setValue(pedido.pedido_Cobranca.valor_Pago);
    this.formPagamento.controls['data_pagamento'].setValue(moment(pedido.pedido_Cobranca.data_Pagamento).format("DD/MM/yyyy HH:mm"));

    this.formPedido.disable();

    if (this.baixa) {
      this.formPagamento.enable();
      this.formPagamento.controls['pago'].setValue(true);
      this.formPagamento.controls['pago'].disable();
    } else {
      this.formPagamento.disable();
    }
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

  abrirDialogCliente() {
    const resultadoDialog = this.dialog.open(ClienteDialogComponent, {
      disableClose: false,
    });

    resultadoDialog.afterClosed().subscribe(cliente => {
      if (cliente != undefined) {
        this.formPedido.controls['cliente'].setValue(cliente.nome);
        this.cliente_id = cliente.id;
        this.clienteSelecionado = true;
        this.nome_cliente = cliente.nome;
        this.data_nasc = cliente.data_Nasc
        this.cpf = cliente.cpf;
      }
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

  override salvar() {

    if (!this.baixa) {
      if(this.formPedido.valid && this.formPeca.valid && this.formPagamento.valid) {
        const pedido = this.montarPedido();
        const pedidoPeca = this.arrayPedidoPecas;
        const pedidoCobranca = this.montarPedidoCobranca();

        const pedidoCreate: PedidoCreate = {
          pedido: pedido,
          pecas: pedidoPeca,
          pedido_Cobranca: pedidoCobranca
        }


        this.pedidoService.create(pedidoCreate)
          .subscribe(res => {
            if (res != null) {
              this.toastr.success("Pedido criado com sucesso!");

              if (pedidoCreate.pedido_Cobranca.pago) {
                this.abrirRecibo(res.num_Pedido);
              }

              this.router.navigate(['gestao/pedido']);
            } else {
              this.toastr.warning("Não foi possível criar o pedido!");
            }
          }, error => {
            console.log(error);
            this.toastr.error("Erro ao criar o pedido!");
          })
      } else {
        this.toastr.info("Campos obrigatórios não preenchidos!")
      }
    } else { // Realizar Baixa do Pedido

      if(this.formPagamento.valid) {

        var pedidoCobranca: PedidoCobranca = {
          num_Pedido: this.route.snapshot.params['id'],
          valor_Pago: UtilFuncoes.hasValue(this.formPagamento.controls['valor_pago'].value) ? this.formPagamento.controls['valor_pago'].value : null,
          data_Pagamento: UtilFuncoes.hasValue(this.formPagamento.controls['data_pagamento'].value) ? moment(this.formPagamento.controls['data_pagamento'].value, "DDMMYYYYHHmm").toDate() : null,
          tipo_Pagamento_Id: this.formPagamento.controls['tipo_pagamento'].value,
          parcelas: UtilFuncoes.hasValue(this.formPagamento.controls['parcelas'].value) ? this.formPagamento.controls['parcelas'].value : null,
          pago: true,
          cancelado: false
        }

        if (!this.pedidoCreateReturn.pedido_Cobranca.pago) {
           this.pedidoService.atualizarPedidoCobranca(pedidoCobranca, true)
            .subscribe(res => {
              if (res) {
                this.toastr.success("Pedido baixado com sucesso!");
                this.abrirRecibo(this.route.snapshot.params['id']);
                this.router.navigate(['gestao/pedido']);
              } else {
                this.toastr.warning("Não foi possível baixar o pedido!");
              }
            }, error => {
              console.log(error);
              this.toastr.error("Erro ao baixar o pedido!");
            })
        } else {
          this.toastr.warning("Pedido já baixado!");
        }

      } else {
        this.toastr.info("Campos obrigatórios não preenchidos!")
      }

    }

  }


  montarPedido(): Pedido {
    return {
      cliente_Id: this.cliente_id,
      usuario_Id: +localStorage.getItem('k_user_id'),
      data_Pedido: moment(this.formPedido.controls['dthr_pedido'].value, "DD/MM/yyyy HH:mm").toDate(),
      ativo: true,
      cancelado: false,
      status_Pedido_Id: 1
    }
  }

  montarPedidoPeca() {

    const array: PedidoPeca[] = [];

    this.arrayPecas.forEach(peca => {
      let pedidoPeca: PedidoPeca = {
        quantidade: this.formPeca.controls["quantidade" + (peca.id)].value,
        peca_Id: peca.id,
        peca_Codigo: peca.codigo,
        valor_Peca: peca.valor_Venda
      }

      array.push(pedidoPeca);
    })

    this.arrayPedidoPecas = array;
    this.table.renderRows();

  }

  montarPedidoCobranca(): PedidoCobranca {

    return {
      valor_Total: this.total_venda,
      valor_Pedido: this.getTotalVendaDesconto(),
      valor_Pago: UtilFuncoes.hasValue(this.formPagamento.controls['valor_pago'].value) ? this.formPagamento.controls['valor_pago'].value : null,
      data_Pagamento: UtilFuncoes.hasValue(this.formPagamento.controls['data_pagamento'].value) ? moment(this.formPagamento.controls['data_pagamento'].value, "DDMMYYYYHHmm").toDate() : null,
      tipo_Pagamento_Id: this.formPagamento.controls['tipo_pagamento'].value,
      parcelas: UtilFuncoes.hasValue(this.formPagamento.controls['parcelas'].value) ? this.formPagamento.controls['parcelas'].value : null,
      pago: this.formPagamento.controls['pago'].value,
      cancelado: false

    }
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

    if (quantidade === 0) {
      this.formPeca.controls["quantidade" + (peca.id)].setValue(1);
    }
  }

  getTotalVenda(): number {

    if (!this.modoConsulta) {
      if (this.arrayPecas.length > 0) {

        this.arrayPecas.forEach(peca => {

        })

      let total: number = this.arrayPecas
        .map(item => this.formPeca.controls["quantidade" + (item.id)].value * item.valor_Venda)
        .reduce((a, b) => a + b, 0);

        this.total_venda = total;
        return +total.toFixed(2);
      }

      return 0;
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


  getTotalVendaDesconto(): number {

    if (!this.modoConsulta) {
      const perc = +this.formPagamento.controls['desconto_perc'].value;

      if (UtilFuncoes.hasValue(perc) && perc > 0) {
        let valor_atualizado = this.total_venda - (this.total_venda * perc / 100);
        this.valor_pedido = +valor_atualizado.toFixed(2);
        return +valor_atualizado.toFixed(2);
      } else {
        this.valor_pedido = +this.getTotalVenda().toFixed(2);
        return +this.getTotalVenda().toFixed(2);
      }
    } else {
      this.valor_pedido = this.pedidoCreateReturn.pedido_Cobranca.valor_Pedido;
      return this.pedidoCreateReturn.pedido_Cobranca.valor_Pedido;
    }


  }

  checkBaixa(event:any) {

    if (event.checked) {
      this.formPagamento.controls['valor_pago'].enable();
      this.formPagamento.controls['data_pagamento'].enable();
    } else {
      this.formPagamento.controls['valor_pago'].disable();
      this.formPagamento.controls['data_pagamento'].disable();
    }

  }

  abrirRecibo(num_pedido?: number) {

    const dialogRef = this.dialog.open(RelReciboPedidoComponent, {
      disableClose: true,
      data: {
        num_pedido: this.utilFuncoes.hasValue(num_pedido) ? num_pedido : this.route.snapshot.params['id'],
        pedido: this.formPedido,
        pedidoPeca: this.formPeca,
        pedidoPagamento: this.formPagamento,
        arrayPedidoPecas: this.arrayPedidoPecas,
        data_nasc: this.data_nasc,
        valor_pedido: this.valor_pedido,
        tipo_pagamento: this.lista_tipoPagamento.filter(x => x.id === this.formPagamento.controls['tipo_pagamento'].value)[0].codigo
      }
    }).close();
  }

}
