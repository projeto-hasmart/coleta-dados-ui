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
import { PaginaMedicaoSucessoComponent } from './pagina-medicao/pagina-medicao-sucesso/pagina-medicao-sucesso.component';
import { PaginaMedicamentosComponent } from './pagina-medicamentos/pagina-medicamentos.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Global } from 'src/app/models/globalConstants';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { PaginaFarmaciaComponent } from './pagina-farmacia/pagina-farmacia.component';
import { PaginaMedicComponent } from './pagina-medic/pagina-medic.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { PaginaMedicVisualizacaoComponent } from './pagina-medic/pagina-medic-visualizacao/pagina-medic-visualizacao.component';
import { PaginaMedicMainComponent } from './pagina-medic/pagina-medic-main/pagina-medic-main.component';
import {MatTabsModule} from '@angular/material/tabs';
import { PaginaCidadaoRelatorioComponent } from './pagina-cidadaos/pagina-cidadao-relatorio/pagina-cidadao-relatorio.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';


// npm install mdbootstrap
@NgModule({
  declarations: [
    PagesComponent,
    PaginaInicio,
    PaginaCidadaosComponent,
    PaginaMedicaoComponent,
    PaginaDispensacaoComponent,
    PaginaCidadaosCadastrarComponent,
    PaginaCidadaosVisualizarComponent,
    PaginaMedicaoSucessoComponent,
    PaginaMedicamentosComponent,
    PaginaFarmaciaComponent,
    PaginaMedicComponent,
    PaginaMedicVisualizacaoComponent,
    PaginaMedicMainComponent,
    PaginaCidadaoRelatorioComponent
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
    MatMenuModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    NgxMaskModule.forRoot(),
    DeviceDetectorModule.forRoot(),
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    Global
  ]
})
export class PagesModule {
}
