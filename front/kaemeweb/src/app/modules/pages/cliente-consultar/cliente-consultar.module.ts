import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteConsultarComponent } from './cliente-consultar.component';
import { ClienteConsultarRoutingModule } from './cliente-consultar.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { DirectivesModule } from '../../shared/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    ClienteConsultarRoutingModule,
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
  ],
  declarations: [ClienteConsultarComponent]
})
export class ClienteConsultarModule { }
