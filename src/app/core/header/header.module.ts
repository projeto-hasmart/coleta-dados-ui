import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { LayoutModule } from '@angular/cdk/layout';
import { HeaderComponent } from './header.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
	MatToolbarModule,
	MatButtonModule,
	MatIconModule,
	MatTooltipModule,
	MatMenuModule,
	MatGridListModule
} from '@angular/material';
import { MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatTooltipModule,
		MatMenuModule,
		MatCardModule,
		LayoutModule,
		FlexLayoutModule,
		MatGridListModule,
		SidebarModule,
		PanelMenuModule
	],
	exports: [HeaderComponent],
	declarations: [HeaderComponent],
	providers: []
})
export class HeaderModule {}
