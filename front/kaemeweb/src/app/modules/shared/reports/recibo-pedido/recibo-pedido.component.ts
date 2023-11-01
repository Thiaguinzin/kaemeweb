
import { Component, Inject, OnInit } from '@angular/core';
import { PedidoPeca } from '../../models/PedidoModels/pedido-peca';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pedido } from '../../models/PedidoModels/pedido';
declare var html2pdf: any;

@Component({
  selector: 'app-recibo-pedido',
  templateUrl: './recibo-pedido.component.html',
  styleUrls: ['./recibo-pedido.component.scss']
})
export class RelReciboPedidoComponent implements OnInit {

  dataEmissao = ' ';
  num_pedido = ' ';

  cliente = ' ';
  data_nasc = ' ';
  data_pedido = ' ';

  arrayPedidoPecas: PedidoPeca[] = [];
  valor_pedido = ' ';
  data_pagamento = ' ';
  parcelas = ' ';
  valor_pago = ' ';

  tipoPagamento: FormGroup = this.fb.group({
    dinheiro: [false, []],
    pix: [false, []],
    cartao: [false, []],
  });

  dinheiroChecked: boolean = false;
  pixChecked: boolean = false;
  cartaoChecked: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    ) { }

  ngOnInit() {

    this.carregarCampos();
    this.pdf();

  }

  pdf() {

    const element: Element = document.getElementById("report");
    const opt = {
      margin: 10,
      filename: 'Expedicao.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }

    html2pdf().set(opt).from(element).output('dataurlnewwindow');

    // html2pdf().set(opt).from(element).toPdf().get('pdf').then( {
    //   // var totalPages = pdf.internal.getNumberOfPages();
    //   // var pageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
    //   // var pageWidth = pdf.internal.pageSize.width || pdf.internal.pageSize.getWidth();
    //   // for (let i = 1; i <= totalPages; i++) {
    //   //   pdf.setPage(i);
    //   //   pdf.setFontSize(8);
    //   //   pdf.setTextColor(150);
    //   //   pdf.text(enderecoOrigem.toString(), pageWidth / 2, pageHeight - 10, { align: 'center' });
    //   //   pdf.text(100, 292, i.toString());
    //   // }
    // }).output('blob').then((data: Blob) => {
    //   var objectURL = URL.createObjectURL(data);
    //   window.open(objectURL);
    //   URL.revokeObjectURL(objectURL);
    // });
    // }}).output('dataurlnewwindow');

  }

  protected carregarCampos() {
    debugger
    this.num_pedido = this.data.num_pedido;
    this.cliente = this.data.pedido.controls['cliente'].value;
    this.data_nasc = this.data.data_nasc;
    this.data_pedido = this.data.pedido.controls['dthr_pedido'].value;

    this.arrayPedidoPecas = this.data.arrayPedidoPecas;
    this.valor_pedido = this.data.valor_pedido;
    this.parcelas = this.data.pedidoPagamento.controls['parcelas'].value;
    this.data_pagamento = this.data.pedidoPagamento.controls['data_pagamento'].value;
    this.valor_pago = this.data.pedidoPagamento.controls['valor_pago'].value;

    if (this.data.tipo_pagamento.trim().toUpperCase().includes("PIX")) {
      this.tipoPagamento.controls['pix'].setValue(true);
    } else if (this.data.tipo_pagamento.trim().toUpperCase().includes("DINHEIRO")) {
      this.tipoPagamento.controls['dinheiro'].setValue(true);
    } else if (this.data.tipo_pagamento.trim().toUpperCase().includes("CART")) {
      this.tipoPagamento.controls['cartao'].setValue(true);
    }

  }

}
