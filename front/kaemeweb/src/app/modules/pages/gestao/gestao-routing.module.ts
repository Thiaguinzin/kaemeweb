import { PedidoModule } from './pedido/pedido.module';
import { EstoqueModule } from './estoque/estoque.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { GestaoComponent } from './gestao.component';
import { NgModel } from '@angular/forms';
import { DashboardComponent } from '../../core/components/dashboard/dashboard.component';
import { RelReciboPedidoComponent } from '../../shared/reports/recibo-pedido/recibo-pedido.component';
import { AcessGuard } from '../../shared/guards/acess.guard';

const routes: Routes = [
  {
    path: '', component: GestaoComponent, data: {breadcrumb: { label: 'Gestão'}},
    children: [
      { path: '', component: DashboardComponent},
      { path: 'cliente', loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule) },
      { path: 'fornecedor', loadChildren: () => import('./fornecedor/fornecedor.module').then(m => m.FornecedorModule) },
      { path: 'estoque', loadChildren: () => import('./estoque/estoque.module').then(m => m.EstoqueModule) },
      { path: 'pedido', loadChildren: () => import('./pedido/pedido.module').then(m => m.PedidoModule) },
      { path: 'usuario', canActivate: [AcessGuard], loadChildren: () => import('../configuracoes/usuario/usuario.module').then(m => m.UsuarioModule) },
      { path: 'relatorio', canActivate: [AcessGuard], loadChildren: () => import('../relatorios/relatorios.module').then(m => m.RelatoriosModule),  data: { breadcrumb: { skip: true }} },

      // { path: 'report', component: RelReciboPedidoComponent, data: {breadcrumb: {disable: true, label: 'Pedido'}} }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestaoRoutingModule {}
