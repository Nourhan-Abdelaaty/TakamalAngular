import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { ClientComponent } from './Components/client/client.component';
import { Apiservice } from './shared/services/crud/apiservice.service';
import { httpInterceptorProviders } from './shared/services/interceptor';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    //httpInterceptorProviders,
    Apiservice,
   // AdminGuard
],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      progressAnimation: "increasing",
      preventDuplicates: true,
  }),
  BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
