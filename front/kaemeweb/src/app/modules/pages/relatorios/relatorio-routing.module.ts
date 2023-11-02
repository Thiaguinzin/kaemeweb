import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { PecasEstoqueComponent } from './pecas-estoque/pecas-estoque.component';


const routes: Routes = [
  { path: '', redirectTo: 'pecas-estoque', pathMatch: 'full' },
  { path: 'pecas-estoque', component: PecasEstoqueComponent, data: {breadcrumb: {label: 'Relatório Peças Estoque'} } },
  // { path: ':id/editar', component: UsuarioFormComponent, data: {breadcrumb: {skip: true} } },
  // { path: ':id/consultar', component: UsuarioFormComponent, data: {breadcrumb: {skip: true} } },
  // { path: 'home', component: UsuarioListaComponent, data: {breadcrumb: {skip: true} } }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioRoutingModule {}
