import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StorageService } from '@services';
import { Observable } from 'rxjs';
import { Paginated } from 'sesa-sd-commons';
import { environment } from '../../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class paginaListagemService {
	private url = environment.apiUrl + 'pagina';

	constructor(
		private http: HttpClient,
		private storageService: StorageService
	) {}

	public getpaginaByFiltro(
		paginated: Paginated<any>,
		filtro: any
	): Observable<Paginated<any>> {
		let params = new HttpParams()
			.append(
				'sort.active',
				paginated.sort && paginated.sort.active ? paginated.sort.active : ''
			)
			.append(
				'sort.direction',
				paginated.sort && paginated.sort.direction
					? paginated.sort.direction
					: ''
			)
			.append('pageNumber', paginated.pageNumber.toString())
			.append('pageSize', paginated.pageSize.toString());

		for (const key of Object.keys(filtro)) {
			const value = filtro[key];
			if (value) {
				params.append(key, value);
			}
		}

		return this.http.get<Paginated<any>>(this.url + '/paginated', {
			params
		});
	}

	public setEstadoDaBusca(url: string, valorFormulario: any) {
		return this.storageService.updateStorage(url, valorFormulario);
	}

	public getEstadoDaBusca(url: string): Observable<FormGroup> {
		return this.storageService.getItemState(url);
	}

	public excluirpagina(idpagina: number) {
		return this.http.delete(this.url + idpagina);
	}
}
