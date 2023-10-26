import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { UsuarioListaComponent } from './usuario-lista/usuario-lista.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', data: {breadcrumb: {label: 'Usuário'} } },
  { path: 'cadastrar', component: UsuarioFormComponent, data: {breadcrumb: {skip: true} } },
  { path: ':id/editar', component: UsuarioFormComponent, data: {breadcrumb: {skip: true} } },
  { path: ':id/consultar', component: UsuarioFormComponent, data: {breadcrumb: {skip: true} } },
  { path: 'home', component: UsuarioListaComponent, data: {breadcrumb: {skip: true} } }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule {}
