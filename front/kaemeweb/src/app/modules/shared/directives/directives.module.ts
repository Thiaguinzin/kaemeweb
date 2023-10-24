import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpperCaseInputDirective } from './upperCaseInputDirective';
import { SpecialCharacterFilterDirective } from './specialCharacterFilterDirective';
import { OnlyNumbersDirective } from './onlyNumbersDirective';
import { NoLeadingZerosDirective } from './appNoLeadingZeros';



@NgModule({
  declarations: [UpperCaseInputDirective, SpecialCharacterFilterDirective, OnlyNumbersDirective, NoLeadingZerosDirective],
  exports: [UpperCaseInputDirective, SpecialCharacterFilterDirective, OnlyNumbersDirective, NoLeadingZerosDirective],
  imports: [
    CommonModule
  ],
})
export class DirectivesModule { }
