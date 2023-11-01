import { MatButtonModule } from '@angular/material/button';
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
import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';
import { ClienteDialogComponent } from './cliente-dialog/cliente-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DirectivesModule } from 'src/app/modules/shared/directives/directives.module';



@NgModule({
  declarations: [
    ClienteFormComponent,
    ClienteListaComponent,
    ClienteDialogComponent
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
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    DirectivesModule
  ],
  exports: [
    ClienteDialogComponent
  ],

})
export class ClienteModule { }
