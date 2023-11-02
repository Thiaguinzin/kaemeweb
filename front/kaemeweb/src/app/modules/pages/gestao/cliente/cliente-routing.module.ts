import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', data: {breadcrumb: {label: 'Cliente'} } },
  { path: 'cadastrar', component: ClienteFormComponent, data: {breadcrumb: {label: 'Cadastrar'} } },
  { path: ':id/editar', component: ClienteFormComponent, data: {breadcrumb: {label: 'Editar'} } },
  { path: ':id/consultar', component: ClienteFormComponent, data: {breadcrumb: {label: 'Consultar'} } },
  { path: 'home', component: ClienteListaComponent, data: {breadcrumb: {skip: true} } }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule {}
