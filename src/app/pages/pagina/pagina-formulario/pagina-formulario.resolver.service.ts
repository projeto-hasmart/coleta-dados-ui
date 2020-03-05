import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { paginaFormularioService } from './pagina-formulario.service';

@Injectable()
export class PaginaFormularioResolver implements Resolve<Observable<any>> {
	constructor(private service: paginaFormularioService) {}

	resolve(route: ActivatedRouteSnapshot): Observable<any> {
		const id: number = +route.queryParamMap.get('id');
		if (!id) {
			return null;
		}
		return this.service.getpaginaById(id);
	}
}
