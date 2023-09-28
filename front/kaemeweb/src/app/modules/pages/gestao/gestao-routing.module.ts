import { EstoqueModule } from './estoque/estoque.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { GestaoComponent } from './gestao.component';
import { NgModel } from '@angular/forms';

const routes: Routes = [
  {
    path: '', component: GestaoComponent, data: {breadcrumb: {disable: true, label: 'Gestão'}},
    children: [
      { path: 'cliente', loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule) },
      { path: 'cliente/:id/editar', loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule) },
      { path: 'fornecedor', loadChildren: () => import('./fornecedor/fornecedor.module').then(m => m.FornecedorModule), data: {breadcrumb: {disable: true, label: 'Fornecedor'}} },
      { path: 'estoque', loadChildren: () => import('./estoque/estoque.module').then(m => m.EstoqueModule), data: {breadcrumb: {disable: true, label: 'Estoque'}} }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestaoRoutingModule {}
