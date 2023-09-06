import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { GestaoComponent } from './gestao.component';
import { NgModel } from '@angular/forms';

const routes: Routes = [
  { path: '', component: GestaoComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestaoRoutingModule {}
