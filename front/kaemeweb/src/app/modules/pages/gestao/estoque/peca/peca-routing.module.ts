import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { PecaFormComponent } from './peca-form/peca-form.component';
import { PecaListaComponent } from './peca-lista/peca-lista.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', data: {breadcrumb: {skip: true} } },
  // { path: 'cadastrar', component: FornecedorFormComponent, data: {breadcrumb: {skip: true} } },
  // { path: ':id/editar', component: FornecedorFormComponent, data: {breadcrumb: {skip: true} } },
  { path: ':id/consultar', component: PecaFormComponent, data: {breadcrumb: {skip: true} } },
  { path: 'home', component: PecaListaComponent, data: {breadcrumb: {skip: true} } },
  { path: 'cadastrar', component: PecaFormComponent, data: {breadcrumb: {label: 'Cadastrar'} } }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PecaRoutingModule {}
