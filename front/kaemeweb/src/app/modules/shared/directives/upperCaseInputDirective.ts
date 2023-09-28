import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: '[appUpperCaseInput]'
})
export class UpperCaseInputDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const originalValue = inputElement.value;
    const newValue = originalValue.toUpperCase();

    if (originalValue !== newValue) {
      inputElement.value = newValue;
      inputElement.dispatchEvent(new Event('input'));
    }
  }
}
