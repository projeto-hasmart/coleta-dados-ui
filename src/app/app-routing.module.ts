import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Rotas } from '@enums';
import { AuthenticationGuard } from 'sesa-sd-controle-acesso';

const routes: Routes = [
	// {
	// 	path: '',
	// 	canActivate: [AuthenticationGuard],
	// 	children: [
	// 		{
	// 			path: '',
	// 			loadChildren: ''
	// 		},
	// 		{
	// 			path: 'formulario',
	// 			loadChildren: ''
	// 		}
	// 	]
	// },
	// {
	// 	path: '**',
	// 	redirectTo: Rotas.EXEMPLO.listagem,
	// 	pathMatch: 'full'
	// }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
