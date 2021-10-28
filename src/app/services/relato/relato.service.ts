import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RelatorioOpiniao } from 'src/app/models/relatorioOpiniao';
import { RelatorioOpiniaoPP } from 'src/app/models/relatorioOpiniaoPostPut';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatoService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }
  selecionadoId: string;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;', Authorization: 'Bearer ' + localStorage.getItem('token'),
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Origin': '*' })
  };
  public createRelato(cidadaoId: string, relatorio: RelatorioOpiniaoPP): Observable<RelatorioOpiniao> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.post<RelatorioOpiniao>((environment.rest.host + '/hasmart/api/Relato/' + cidadaoId), relatorio, this.httpOptions)
    .pipe(
      catchError(this.handleError));
  }

  public getRelatoParaCidadao(cidadaoId: string, relatorioId: string): Observable<RelatorioOpiniao> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get<RelatorioOpiniao>((environment.rest.host + '/hasmart/api/Relato/' + cidadaoId + '/' + relatorioId), this.httpOptions)
    .pipe(
      catchError(this.handleError));
  }

  public getRelatosParaCidadao(cidadaoId: string): Observable<RelatorioOpiniao[]> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get<RelatorioOpiniao[]>((environment.rest.host + '/hasmart/api/Relato/' + cidadaoId), this.httpOptions)
    .pipe(
      catchError(this.handleError));
  }
  public getRelatosParaCidadaosAnonimos(anonimoName: string): Observable<RelatorioOpiniao[]> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get<RelatorioOpiniao[]>((environment.rest.host + '/hasmart/api/Relato/' + anonimoName + '/anonimo'), this.httpOptions)
    .pipe(
      catchError(this.handleError));
  }
  public deleteRelatoParaCidadao(cidadaoId: string, relatorioId: string): Observable<RelatorioOpiniao> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.delete<RelatorioOpiniao>((environment.rest.host + '/hasmart/api/Relato/' + cidadaoId + '/' + relatorioId), this.httpOptions)
    .pipe(
      catchError(this.handleError));
  }

  public updateRelatoParaCidadao(cidadaoId: string, relatorioId: string, relato: RelatorioOpiniaoPP): Observable<RelatorioOpiniao> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.put<RelatorioOpiniao>((environment.rest.host + '/hasmart/api/Relato/' + cidadaoId + '/' + relatorioId), relato, this.httpOptions)
    .pipe(
      catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    // console.log(error);
    return throwError(error);
  }
}
