import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Rotas } from '@enums';
import { paginaListagemResolver } from './pagina-listagem.resolver.service';
import { paginaListagemComponent } from './pagina-listagem.component';

const routes: Routes = [
	{
		path: '',
		data: {
			rotaPrincipal: Rotas.PAGINA.listagem
		},
		component: paginaListagemComponent,
		resolve: {
			pagina: paginaListagemResolver
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [paginaListagemResolver]
})
export class PaginaListagemRoutingModule {}
