import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';
import { FornecedorListaComponent } from './fornecedor-lista/fornecedor-lista.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FornecedorRoutingModule } from './fornecedor-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    FornecedorFormComponent,
    FornecedorListaComponent
  ],
  imports: [
    CommonModule,
    FornecedorRoutingModule,
    SharedModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule
  ]
})
export class FornecedorModule { }
