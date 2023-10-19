import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { PedidoFormComponent } from './pedido-form/pedido-form.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full', data: {breadcrumb: {label: 'Pedidos'} } },
  { path: 'cadastrar', component: PedidoFormComponent, data: {breadcrumb: {label: 'Cadastrar Pedido'}} },
  // { path: ':id/editar', component: FornecedorFormComponent, data: {breadcrumb: {skip: true} } },
  // { path: ':id/consultar', component: FornecedorFormComponent, data: {breadcrumb: {skip: true} } },
  // { path: 'home', component: FornecedorListaComponent, data: {breadcrumb: {skip: true} } }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule {}
