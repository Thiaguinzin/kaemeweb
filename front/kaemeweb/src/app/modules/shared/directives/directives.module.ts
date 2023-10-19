import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpperCaseInputDirective } from './upperCaseInputDirective';
import { SpecialCharacterFilterDirective } from './specialCharacterFilterDirective';
import { OnlyNumbersDirective } from './onlyNumbersDirective';



@NgModule({
  declarations: [UpperCaseInputDirective, SpecialCharacterFilterDirective, OnlyNumbersDirective],
  exports: [UpperCaseInputDirective, SpecialCharacterFilterDirective, OnlyNumbersDirective],
  imports: [
    CommonModule
  ],
})
export class DirectivesModule { }
