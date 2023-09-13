import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    ClienteComponent,
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class ClienteModule { }
