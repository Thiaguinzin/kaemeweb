import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './modules/shared/guards/auth.guard';
import { CoreModule } from './modules/core/core.module';
import { ToastrModule } from 'ngx-toastr';
import { RequestInterceptor } from './modules/shared/interceptors/request.interceptor';
import { AcessGuard } from './modules/shared/guards/acess.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    CoreModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-left',
      preventDuplicates: true,
      closeButton: true
    }),
  ],
  providers: [
    AuthGuard,
    AcessGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
