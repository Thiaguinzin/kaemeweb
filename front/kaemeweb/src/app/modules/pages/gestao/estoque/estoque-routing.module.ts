import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { TipoPecaComponent } from './tipo-peca/tipo-peca.component';

const routes: Routes = [
  { path: '', redirectTo: 'peca', pathMatch: 'full',  data: {breadcrumb: {skip: true} } },
  // { path: 'cadastrar', component: FornecedorFormComponent, data: {breadcrumb: {skip: true} } },
  // { path: ':id/editar', component: FornecedorFormComponent, data: {breadcrumb: {skip: true} } },
  // { path: ':id/consultar', component: FornecedorFormComponent, data: {breadcrumb: {skip: true} } },
  // { path: 'home', component: FornecedorListaComponent, data: {breadcrumb: {skip: true} } }
  { path: 'tipo-peca', component: TipoPecaComponent, data: {breadcrumb: {label: 'Tipo Peça'} } },
  { path: 'peca', loadChildren: () => import('./peca/peca.module').then(m => m.PecaModule) }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstoqueRoutingModule {}
