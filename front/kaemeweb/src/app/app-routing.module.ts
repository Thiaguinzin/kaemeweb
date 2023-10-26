import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/shared/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./modules/pages/login/login.module').then(m => m.LoginModule) },
  { path: 'consultar-pedido', loadChildren: () => import('./modules/pages/cliente-consultar/cliente-consultar.module').then(m => m.ClienteConsultarModule) },
  { path: 'gestao', canActivate: [AuthGuard], loadChildren: () => import('./modules/pages/gestao/gestao.module').then(m => m.GestaoModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
