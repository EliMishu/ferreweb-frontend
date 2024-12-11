import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appLimitDecimal]',
  standalone: true
})
export class LimitDecimalDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('blur', ['$event'])
  onBlur(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;

    if (value && !isNaN(Number(value))) {
      value = parseFloat(value).toFixed(2);
      this.ngControl.control?.setValue(value);
    }
  }
}
