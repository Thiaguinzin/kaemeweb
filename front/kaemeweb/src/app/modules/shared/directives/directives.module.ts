import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpperCaseInputDirective } from './upperCaseInputDirective';
import { SpecialCharacterFilterDirective } from './specialCharacterFilterDirective';



@NgModule({
  declarations: [UpperCaseInputDirective, SpecialCharacterFilterDirective],
  exports: [UpperCaseInputDirective, SpecialCharacterFilterDirective],
  imports: [
    CommonModule
  ],
})
export class DirectivesModule { }
