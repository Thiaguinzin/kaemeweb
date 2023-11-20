import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { PecaFormComponent } from './peca-form/peca-form.component';
import { PecaListaComponent } from './peca-lista/peca-lista.component';
import { CanDeactivateGuard } from 'src/app/modules/shared/guards/can-deactivate.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', data: {breadcrumb: {label: 'Peça'} } },
  { path: 'cadastrar', component: PecaFormComponent, data: {breadcrumb: {label: 'Cadastrar'} }, canDeactivate: [CanDeactivateGuard] },
  { path: ':id/consultar', component: PecaFormComponent, data: {breadcrumb: {label: 'Consultar'} } },
  { path: ':id/editar', component: PecaFormComponent, data: {breadcrumb: {label: 'Editar'} }, canDeactivate: [CanDeactivateGuard] },
  { path: 'home', component: PecaListaComponent, data: {breadcrumb: {skip: true} } },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PecaRoutingModule {}
