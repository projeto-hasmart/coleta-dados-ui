import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Cidadao } from 'src/app/models/cidadao';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CidadaoServiceService {
  selecionadoId: number;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  cidadaos: Cidadao[];
  cidadano: Cidadao;
  constructor(private httpClient: HttpClient, private router: Router) {
   }

  // API: GET /cidadaos
  getAllCidadaos(cpf: string): Observable<Cidadao[]> {
    return this.httpClient.get<Cidadao[]>('api/hasmart/api/Cidadaos?cpf=' + cpf)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getCidadaos(rg: string): Observable<Cidadao[]> {
    return this.httpClient.get<Cidadao[]>('api/hasmart/api/Cidadaos?rg=' + rg)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  selecionaCidadao(digitado: string, groupValue?: string) {
    if (groupValue === 'cpf') {
      this.getAllCidadaos(digitado).subscribe(cidadao => {
        console.log(groupValue, digitado, ' isso foi pesquisado');
        this.cidadaos = cidadao as Cidadao[];
        console.log('isso é o resultado', cidadao);
        console.log('isso tambem é resultado', this.cidadaos);
        this.selecionadoId = this.cidadaos[0].id;
        console.log('isso também é selecionado', this.selecionadoId);
        this.router.navigate(['/cidadaos/visualizar']);
      });
    } else if (groupValue === 'rg') {
      this.getCidadaos(digitado).subscribe(cidadao => {
        this.cidadaos = cidadao as Cidadao[];
        this.selecionadoId = cidadao[0].id;
        this.router.navigate(['/cidadaos/visualizar']);
      });
    }


  }
  public getCidadaoById(cidadaoId: number): Observable<Cidadao> {
    return this.httpClient.get<Cidadao>('api/hasmart/api/Cidadaos/' + cidadaoId)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  jaTemosCidadao(id: number) {
    this.getCidadaoById(id).subscribe(cidadao => {
      this.cidadano = cidadao as Cidadao;
      this.selecionadoId = cidadao.id;
      this.router.navigate(['/cidadaos/visualizar']);

    });

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
    return throwError(errorMessage);
  }
}
