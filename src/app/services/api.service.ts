import { Cidadao } from './../models/cidadao';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  cidadaos: Array<Cidadao>;
  constructor(private httpClient: HttpClient) { }
  // API: GET /cidadaos
  getAllCidadaos(): Observable<Cidadao[]> {
    return this.httpClient.get<Cidadao[]>('api/hasmart/api/Cidadaos')
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // API: POST /HaSmart/api/cidadaos
  public createCidadao(cidadao: Cidadao): Observable<Cidadao> {
    return this.httpClient.post<Cidadao>(('api/hasmart/api/Cidadaos'), cidadao)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  // API: GET /cidadaos/:id
  public getCidadaoById(cidadaoId: number): Observable<Cidadao> {
    return this.httpClient.get<Cidadao>('api/hasmart/api/Cidadaos/' + cidadaoId)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // API: PUT /cidadaos/:id
  public updateCidadao(cidadao: Cidadao): Observable<any> {
    return this.httpClient.put(('api/hasmart/api/Cidadaos/' + cidadao.id), cidadao)
      .pipe(
      retry(2),
      catchError(this.handleError));
  }

  // DELETE /todos/:id
  public deleteTodoById(todoId: number) {
    // will use this.http.delete()
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
    console.log(errorMessage);
    console.log(error);
    return throwError(errorMessage);
  }
}
