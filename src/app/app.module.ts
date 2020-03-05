import { HeaderModule } from './core/header/header.module';
import { NgModule } from '@angular/core';
import { SesaSdBootStrapModule } from 'sesa-sd-commons';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// OBSERVAÇÃO no PACKAGE está a dependencia do PRIMENG
// è necessario pois estamos em migração para o PRIME. por tanto estamos utilizando o Material e o PRIME
@NgModule({
	declarations: [AppComponent],
	imports: [
		HeaderModule,
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
export class AppModule {}
