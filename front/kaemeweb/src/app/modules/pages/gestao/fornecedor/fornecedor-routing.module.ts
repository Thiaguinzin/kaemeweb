import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';
import { FornecedorListaComponent } from './fornecedor-lista/fornecedor-lista.component';
import { CanDeactivateGuard } from 'src/app/modules/shared/guards/can-deactivate.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', data: {breadcrumb: {label: 'Fornecedor'} } },
  { path: 'cadastrar', component: FornecedorFormComponent, data: {breadcrumb: {label: 'Cadastrar'} }, canDeactivate: [CanDeactivateGuard] },
  { path: ':id/editar', component: FornecedorFormComponent, data: {breadcrumb: {label: 'Editar'} }, canDeactivate: [CanDeactivateGuard] },
  { path: ':id/consultar', component: FornecedorFormComponent, data: {breadcrumb: {label: 'Consultar'} } },
  { path: 'home', component: FornecedorListaComponent, data: {breadcrumb: {skip: true} } }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedorRoutingModule {}
