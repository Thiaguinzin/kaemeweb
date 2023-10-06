import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PecaFormComponent } from './peca-form/peca-form.component';
import { PecaListaComponent } from './peca-lista/peca-lista.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PecaRoutingModule } from './peca-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { DirectivesModule } from 'src/app/modules/shared/directives/directives.module';



@NgModule({
  declarations: [
    PecaFormComponent,
    PecaListaComponent
  ],
  imports: [
    CommonModule,
    PecaRoutingModule,
    SharedModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    DirectivesModule
  ]
})
export class PecaModule { }
