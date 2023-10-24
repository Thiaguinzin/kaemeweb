import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoLeadingZeros]'
})
export class NoLeadingZerosDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: any) {
    const inputValue = event.target.value;

    // Verifica se a entrada começa com um zero
    if (inputValue.startsWith('0')) {
      // Remove o zero inicial
      event.target.value = inputValue.substr(1);
    }
  }
}
