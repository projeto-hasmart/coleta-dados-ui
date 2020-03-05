export class Menu {
	idMenu: number;
	descricao: string;
	sistema: any;
	rota: string;
	recurso: string;
	listaMenus: Array<Menu>;

	constructor(obj?: Partial<Menu>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
