import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class paginaFormularioService {
	private url = environment.apiUrl + 'pagina';

	constructor(private http: HttpClient) {}

	public salvarDadospagina(pagina: any): Observable<any> {
		if (pagina.id) {
			return this.http.put<any>(this.url, pagina);
		} else {
			return this.http.post<any>(this.url, pagina);
		}
	}

	public getpaginaById(id: number): Observable<any> {
		return this.http.get<any>(this.url + '/' + id);
	}
}
