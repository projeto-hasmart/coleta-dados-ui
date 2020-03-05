import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { paginaListagemService } from './pagina-listagem.service';

@Injectable()
export class paginaListagemResolver implements Resolve<Observable<any>> {
	constructor(private service: paginaListagemService) {}

	resolve(route: ActivatedRouteSnapshot) {
		// IMPLEMENTAR CONFORME NECESSÁRIO
		return null;
	}
}
