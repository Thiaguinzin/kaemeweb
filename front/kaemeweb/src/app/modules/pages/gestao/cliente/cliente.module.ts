import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteRoutingModule } from './cliente-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    ClienteFormComponent,
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class ClienteModule { }
