import { NgModule } from '@angular/core';
import { paginaListagemComponent } from './pagina-listagem.component';
import { CommonModule } from '@angular/common';
import {
	SesaSdContainerModule,
	SdTabelaModule,
	SesaSdModalModule,
	SdPipesModule,
	SesaDirectiveModule
} from 'sesa-sd-commons';
import {
	MatAutocompleteModule,
	MatCardModule,
	MatChipsModule,
	MatDatepickerModule,
	MatFormFieldModule,
	MatListModule,
	MatInputModule,
	MatIconModule,
	MatButtonModule,
	MatSelectModule,
	MatOptionModule,
	MatGridListModule,
	MatSlideToggleModule,
	MatTooltipModule,
	MatMenuModule,
	MatCheckboxModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginaListagemRoutingModule } from './pagina-listagem-routing.module';

@NgModule({
	declarations: [paginaListagemComponent],
	imports: [
		CommonModule,
		SesaSdContainerModule,

		MatAutocompleteModule,
		MatCardModule,
		MatChipsModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatListModule,
		MatInputModule,
		MatIconModule,
		MatButtonModule,
		MatSelectModule,
		MatOptionModule,
		MatGridListModule,
		MatSlideToggleModule,
		MatTooltipModule,
		MatMenuModule,
		MatCheckboxModule,

		ReactiveFormsModule,

		SdTabelaModule,
		SesaSdModalModule,
		SdPipesModule,
		SesaDirectiveModule,

		PaginaListagemRoutingModule
	]
})
export class PaginaListagemModule {}
