import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', data: {breadcrumb: {label: 'Fornecedor'} } },
  { path: 'cadastrar', component: FornecedorFormComponent, data: {breadcrumb: {skip: true} } },
  { path: ':id/editar', component: FornecedorFormComponent, data: {breadcrumb: {skip: true} } },
  { path: ':id/consultar', component: FornecedorFormComponent, data: {breadcrumb: {skip: true} } },
  { path: 'home', component: FornecedorFormComponent, data: {breadcrumb: {skip: true} } }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedorRoutingModule {}
