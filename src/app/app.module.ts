import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from './services/api.service';
import { CidadaoServiceService } from './services/cidadao/cidadao-service.service';
import { DispensacaoServiceService } from './services/dispensacao/dispensacao-service.service';
import { MedicaoServiceService } from './services/medicao/medicao-service.service';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    CidadaoServiceService,
    DispensacaoServiceService,
    MedicaoServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
