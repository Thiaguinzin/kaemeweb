import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpperCaseInputDirective } from './upperCaseInputDirective';



@NgModule({
  declarations: [UpperCaseInputDirective],
  exports: [UpperCaseInputDirective],
  imports: [
    CommonModule
  ],
})
export class DirectivesModule { }
