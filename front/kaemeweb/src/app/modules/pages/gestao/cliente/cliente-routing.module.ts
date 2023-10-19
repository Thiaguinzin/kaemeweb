import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', data: {breadcrumb: {skip: true} } },
  { path: 'cadastrar', component: ClienteFormComponent, data: {breadcrumb: {label: 'Cadastrar Cliente'} } },
  { path: ':id/editar', component: ClienteFormComponent, data: {breadcrumb: {label: 'Editar Cliente'} } },
  { path: ':id/consultar', component: ClienteFormComponent, data: {breadcrumb: {label: 'Consultar Cliente'} } },
  { path: 'home', component: ClienteListaComponent, data: {breadcrumb: {label: 'Clientes'} } }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule {}
