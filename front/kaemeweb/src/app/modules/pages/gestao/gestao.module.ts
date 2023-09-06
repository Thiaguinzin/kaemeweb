import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestaoComponent } from './gestao.component';
import { GestaoRoutingModule } from './gestao-routing.module';
import { CoreModule } from '../../core/core.module';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    GestaoRoutingModule,
    CoreModule,
  ],
  declarations: [GestaoComponent]
})
export class GestaoModule { }
