import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule
  ],
  providers: [
    AuthService,
    TokenService
  ]
})
export class SharedModule { }
