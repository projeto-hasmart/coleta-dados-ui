import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Rotas } from '@enums';
import { AuthenticationGuard } from 'sesa-sd-controle-acesso';

const routes: Routes = [
	{
		path: 'pagina',
		children: [
			{
				path: '',
				loadChildren:
					'./pages/pagina/pagina-listagem/pagina-listagem.module#PaginaListagemModule',
				canActivate: [AuthenticationGuard]
			},
			{
				path: 'formulario',
				loadChildren:
					'./pages/pagina/pagina-formulario/pagina-formulario.module#PaginaFormularioModule',
				canActivate: [AuthenticationGuard]
			}
		]
	},
	{
		path: '**',
		redirectTo: Rotas.PAGINA.listagem,
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
