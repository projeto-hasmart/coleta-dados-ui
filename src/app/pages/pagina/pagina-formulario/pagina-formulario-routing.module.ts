import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaFormularioResolver } from './pagina-formulario.resolver.service';
import { paginaFormularioComponent } from './pagina-formulario.component';

const routes: Routes = [
	{
		path: '',
		component: paginaFormularioComponent,
		resolve: {
			pagina: PaginaFormularioResolver
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [PaginaFormularioResolver]
})
export class paginaFormularioRoutingModule {}
