import { PaginaMedicComponent } from './pagina-medic/pagina-medic.component';
import { PaginaFarmaciaComponent } from './pagina-farmacia/pagina-farmacia.component';
import { PaginaMedicaoComponent } from './pagina-medicao/pagina-medicao.component';
import { PaginaDispensacaoComponent } from './pagina-dispensacao/pagina-dispensacao.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PagesComponent} from './pages/pages.component';
import {PaginaInicio} from './pagina-inicio/pagina-inicio.component';
import { PaginaCidadaosComponent } from './pagina-cidadaos/pagina-cidadaos.component';
import { PaginaCidadaosCadastrarComponent } from './pagina-cidadaos/pagina-cidadaos-cadastrar/pagina-cidadaos-cadastrar.component';
import { PaginaCidadaosVisualizarComponent } from './pagina-cidadaos/pagina-cidadaos-visualizar/pagina-cidadaos-visualizar.component';
import { PaginaMedicaoSucessoComponent } from './pagina-medicao/pagina-medicao-sucesso/pagina-medicao-sucesso.component';
import { PaginaMedicamentosComponent } from './pagina-medicamentos/pagina-medicamentos.component';
import { AuthGuard } from '../auth/auth.guard';


const routes: Routes = [
  {
    path: '', component: PagesComponent,  children: [
      { path: 'inicio', component:  PaginaInicio },
      { path: 'cidadaos', component: PaginaCidadaosComponent},
        {path: 'cidadaos/cadastrar', component: PaginaCidadaosCadastrarComponent},
        {path: 'cidadaos/visualizar', component: PaginaCidadaosVisualizarComponent},
      { path: 'medicao', component: PaginaMedicaoComponent},
      {path: 'medicao/sucesso', component: PaginaMedicaoSucessoComponent},
      {path: 'admin/farmacia', component: PaginaFarmaciaComponent},
    ]
  },
  {
    path: 'medico/visualizar', component: PaginaMedicComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
