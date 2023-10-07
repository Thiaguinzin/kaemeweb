import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSpecialCharacterFilter]'
})
export class SpecialCharacterFilterDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const inputValue = inputElement.value;

    // Use uma expressão regular para permitir apenas letras, números e espaços
    const filteredValue = inputValue.replace(/[^a-zA-Z0-9\s]/g, '');

    if (filteredValue !== inputValue) {
      inputElement.value = filteredValue;
      inputElement.dispatchEvent(new Event('input'));
    }
  }
}
