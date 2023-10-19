import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[onlyNumbersDirective]'
})
export class OnlyNumbersDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const inputValue = inputElement.value;

    // Use uma expressão regular para permitir apenas letras, números e espaços
    const filteredValue = inputValue.replace(/[^0-9]/g, '');

    if (filteredValue !== inputValue) {
      inputElement.value = filteredValue;
      inputElement.dispatchEvent(new Event('input'));
    }
  }
}
