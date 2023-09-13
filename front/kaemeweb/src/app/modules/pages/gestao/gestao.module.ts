import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestaoComponent } from './gestao.component';
import { GestaoRoutingModule } from './gestao-routing.module';
import { CoreModule } from '../../core/core.module';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { ClienteModule } from './cliente/cliente.module';
import { FornecedorComponent } from './fornecedor/fornecedor.component';

@NgModule({
  imports: [
    CommonModule,
    GestaoRoutingModule,
    CoreModule,
    BreadcrumbModule,
    ClienteModule

  ],
  declarations: [GestaoComponent, FornecedorComponent]
})
export class GestaoModule { }
