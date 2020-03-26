import {NgModule, Component} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PagesRoutingModule} from './pages-routing.module';
import {PagesComponent} from './pages/pages.component';
import {PaginaInicio} from './pagina-inicio/pagina-inicio.component';
import {LayoutModule} from '../layout/layout.module';
import {PaginaCidadaosComponent} from './pagina-cidadaos/pagina-cidadaos.component';
import {PaginaMedicaoComponent} from './pagina-medicao/pagina-medicao.component';
import {PaginaDispensacaoComponent} from './pagina-dispensacao/pagina-dispensacao.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule} from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PaginaCidadaosCadastrarComponent } from './pagina-cidadaos/pagina-cidadaos-cadastrar/pagina-cidadaos-cadastrar.component';
import { MatCardModule } from '@angular/material/card';
import { PaginaCidadaosVisualizarComponent } from './pagina-cidadaos/pagina-cidadaos-visualizar/pagina-cidadaos-visualizar.component';
import { MatButtonModule } from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    PagesComponent,
    PaginaInicio,
    PaginaCidadaosComponent,
    PaginaMedicaoComponent,
    PaginaDispensacaoComponent,
    PaginaCidadaosCadastrarComponent,
    PaginaCidadaosVisualizarComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutModule,
    MatButtonToggleModule,
    MatTableModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class PagesModule {
}
