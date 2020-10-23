import { environment } from './../../../environments/environment';
import { Farmacia } from './../../models/farmacia';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Cidadao } from 'src/app/models/cidadao';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Response-Type': 'text',
    Authorization: 'Bearer ' + localStorage.getItem('token') } )
  };
  statusCode: number;
  constructor(private httpClient: HttpClient) { }

  getAllCidadaos(cpf: string): Observable<Cidadao[]> {
    return this.httpClient.get<Cidadao[]>(environment.api + '/hasmart/api/Cidadaos?cpf=' + cpf, this.httpOptions)
      .pipe(
        map((data: Cidadao[]) => {
          return data;
        }),
        retry(2),
        catchError(this.handleError));
  }

  getCidadaos(rg: string): Observable<Cidadao[]> {
    return this.httpClient.get<Cidadao[]>(environment.api + '/hasmart/api/Cidadaos?rg=' + rg, this.httpOptions)
      .pipe(
        map((data: Cidadao[]) => {
          return data;
        }),
        retry(2),
        catchError(this.handleError));
  }

  public createCidadao(cidadao: Cidadao): Observable<Cidadao> {
    return this.httpClient.post<Cidadao>((environment.api + '/hasmart/api/Cidadaos'), cidadao, this.httpOptions)
    .pipe(
      catchError(this.handleError));
  }
  public createFarmacia(farmacia: Farmacia): Observable<Farmacia> {
    return this.httpClient.post<Farmacia>((environment.api + '/hasmart/api/Farmacia'), farmacia, this.httpOptions)
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
    // console.log(errorMessage);
    // console.log(error);
    this.statusCode = error.status;
    return throwError(error);
  }
}
