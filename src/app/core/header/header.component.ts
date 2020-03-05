import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Menu } from '@entities';
import { MenuItem } from 'primeng/api';

@Component({
	// tslint:disable-next-line: component-selector
	selector: 'header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	public menuOn = true;
	public dataExpiracao = '';
	public menus: any = [];
	private ehDesenvolvimento = true;

	private referenciaMenuAtivo: MenuItem = {};

	constructor(private dialog: MatDialog, @Inject(DOCUMENT) private document) {
		this.ehDesenvolvimento = true;
	}

	ngOnInit() {
		this.preencherMenu();
	}

	deslogar() {
		console.log('Deslogar');
	}

	private preencherMenu() {
		const sistemas = [
			{
				descricao: 'HASMart',
				listaMenus: [{ descricao: 'PAGINA', rota: 'pagina' }]
			}
		];
		const menus: MenuItem[] = [];
		sistemas.forEach(item => {
			menus.push({
				...this.prepararMenus({
					descricao: item.descricao,
					rota: '',
					listaMenus: item.listaMenus
				})
			});
		});

		this.menus = menus;
	}

	private prepararMenus(menuSesa: any): MenuItem {
		const menuItem: MenuItem = { items: [] };
		const filhos = [];

		if (menuSesa.listaMenus) {
			menuItem.items = [];
			menuSesa.listaMenus.forEach(item => {
				const filho: MenuItem = this.prepararMenus(item);
				filhos.push({ ...filho });
			});
		}
		menuItem.label = menuSesa.descricao ? menuSesa.descricao.toUpperCase() : '';
		menuItem.items = filhos.length ? filhos : null;
		this.setRotaMenuItem(menuSesa, menuItem);
		menuItem.command = event => {
			if (event.item.url || event.item.routerLink) {
				this.referenciaMenuAtivo.styleClass = '';
				event.item.styleClass = 'ativo';
				this.referenciaMenuAtivo = event.item;
			}
		};
		return menuItem;
	}

	private setRotaMenuItem(menuSesa: Menu, menuItem: MenuItem) {
		if (this.ehDesenvolvimento) {
			if (!menuSesa.listaMenus && !menuSesa.rota) {
				throw new Error('Menu sem rota definida!!');
			}

			if (!menuSesa.rota) {
				return;
			}
			menuItem.routerLink = menuSesa.rota;
			return;
		}

		if (!menuSesa.rota) {
			return;
		}

		const url = new URL(this.document.location.href);
		const recurso = url.pathname.replace(/\//g, '');
		if (menuSesa.recurso === recurso) {
			menuItem.routerLink = menuSesa.rota;
		} else {
			menuItem.url = `${url.origin}/${menuSesa.recurso}/#/${menuSesa.rota}`;
		}
	}
}
