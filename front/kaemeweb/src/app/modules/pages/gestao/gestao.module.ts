import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestaoComponent } from './gestao.component';
import { GestaoRoutingModule } from './gestao-routing.module';
import { CoreModule } from '../../core/core.module';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { ClienteModule } from './cliente/cliente.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from '../../shared/interceptors/request.interceptor';
import { SharedModule } from '../../shared/shared.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { MatCardModule } from '@angular/material/card';
import { PedidoModule } from './pedido/pedido.module';

@NgModule({
  imports: [
    CommonModule,
    GestaoRoutingModule,
    CoreModule,
    BreadcrumbModule,
    SharedModule,
    ClienteModule,
    FornecedorModule,
    MatCardModule,
    SharedModule,
    PedidoModule

  ],
  declarations: [GestaoComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ]
})
export class GestaoModule { }
