import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioListaComponent } from './usuario-lista/usuario-lista.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioRoutingModule } from './usuario-routing.module';



@NgModule({
  declarations: [UsuarioListaComponent, UsuarioFormComponent],
  imports: [
    CommonModule,
    CommonModule,
    UsuarioRoutingModule,
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
export class UsuarioModule { }
