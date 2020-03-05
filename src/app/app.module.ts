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
			URL_AUTH: environment.urlAuth,
			// Esse seriam os MENUS do Saude DIGITAL!
			// Mas o sistema de vocês não fazem parte do Digital então tem essa opção aqui para criar menu proprio.
			// Na nossa LIB hoje está sendo necessária passar o sistema como parametro. Caso contrário será listado o menu do Saude Digital
			// A medida do tempo podemos conversar sobre... caso vocês não queiram esse layout... bastaria retirar o selector sesa-sd-bootstrap do app.componenet.HTML
			SISTEMAS: [
				{
					descricao: 'HASMart',
					listaMenus: [{ descricao: 'PAGINA', rota: 'pagina' }]
				}
			]
		}),
		AppRoutingModule
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
