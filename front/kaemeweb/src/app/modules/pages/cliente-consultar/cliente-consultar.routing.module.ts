import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteConsultarComponent } from './cliente-consultar.component';

const routes: Routes = [{ path: '', component: ClienteConsultarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteConsultarRoutingModule { }
