import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-template-default',
  templateUrl: './template-default.component.html',
  styleUrls: ['./template-default.component.scss']
})
export class TemplateDefaultComponent {

  @Input('titulo') titulo: string = '';

  @Output() acaoFormulario = new EventEmitter<any>();

  acaoClick(acao: string) {
    this.acaoFormulario.emit(acao);
  }

}
