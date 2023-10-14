import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoPecaComponent } from './tipo-peca/tipo-peca.component';
import { EstoqueRoutingModule } from './estoque-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';



@NgModule({
  declarations: [
    TipoPecaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EstoqueRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSlideToggleModule
  ]
})
export class EstoqueModule { }
