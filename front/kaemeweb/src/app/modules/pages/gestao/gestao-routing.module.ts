import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { GestaoComponent } from './gestao.component';
import { NgModel } from '@angular/forms';
import { FornecedorComponent } from './fornecedor/fornecedor.component';

const routes: Routes = [
  {
    path: '', component: GestaoComponent, data: {breadcrumb: {disable: true, label: 'Gestão'}},
    children: [
      { path: 'cliente', loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule) },
      { path: 'cliente/:id/editar', loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule) },
      { path: 'fornecedor', component: FornecedorComponent }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestaoRoutingModule {}
