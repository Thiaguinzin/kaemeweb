import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoFormComponent } from './pedido-form/pedido-form.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PedidoRoutingModule } from './pedido-routing.module';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ClienteModule } from '../cliente/cliente.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { PecaModule } from '../estoque/peca/peca.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { DirectivesModule } from 'src/app/modules/shared/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PedidoRoutingModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    ClienteModule,
    PecaModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    DirectivesModule
  ],
  declarations: [PedidoFormComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class PedidoModule { }
