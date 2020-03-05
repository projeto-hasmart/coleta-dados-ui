import { NgModule } from '@angular/core';
import { SesaSdBootStrapModule } from 'sesa-sd-commons';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    SesaSdBootStrapModule.forRoot({
      URL_SERVIDOR: environment.apiUrl,
      USUARIO: environment.USUARIO,
      DESENVOLVIMENTO: environment.DESENVOLVIMENTO
        ? environment.DESENVOLVIMENTO
        : false,
      URL_AUTH: environment.urlAuth
    }),
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
