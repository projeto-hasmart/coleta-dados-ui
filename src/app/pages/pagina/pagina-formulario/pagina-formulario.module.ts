import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
	MatAutocompleteModule,
	MatButtonModule,
	MatCardModule,
	MatDatepickerModule,
	MatFormFieldModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatOptionModule,
	MatSelectModule,
	MatSlideToggleModule
} from '@angular/material';
import { NgxMaskModule } from 'ngx-mask';
import {
	SesaSdContainerModule,
	SesaSdModalModule,
	SesaDirectiveModule
} from 'sesa-sd-commons';
import { paginaFormularioRoutingModule } from './pagina-formulario-routing.module';
import { paginaFormularioComponent } from './pagina-formulario.component';

@NgModule({
	declarations: [paginaFormularioComponent],
	imports: [
		CommonModule,

		MatAutocompleteModule,
		MatButtonModule,
		MatCardModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatGridListModule,
		MatIconModule,
		MatInputModule,
		MatOptionModule,
		MatSelectModule,
		MatSlideToggleModule,

		NgxMaskModule.forRoot(),

		ReactiveFormsModule,
		SesaSdModalModule,
		SesaSdContainerModule,
		SesaDirectiveModule,

		paginaFormularioRoutingModule
	]
})
export class PaginaFormularioModule {}
