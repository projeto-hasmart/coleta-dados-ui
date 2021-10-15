import { RelatorioOpiniao } from './../../models/relatorioOpiniao';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Cidadao } from 'src/app/models/cidadao';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CidadaoServiceService {

  cidadaos: Cidadao[];
  cidadano: Cidadao;
  constructor(private httpClient: HttpClient, private router: Router) {
   }
   selecionadoId: string;
   httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json;', Authorization: 'Bearer ' + localStorage.getItem('token') })
   };

   // API: GET /cidadaos
   getAllCidadaos(cpf: string): Observable<Cidadao[]> {
     return this.httpClient.get<Cidadao[]>(environment.rest.host + '/hasmart/api/Cidadaos?cpf=' + cpf, this.httpOptions)
       .pipe(
         map((data: Cidadao[]) => {
           return data;
         }),
         retry(2),
         catchError(this.handleError));
   }
   getCidadaos(rg: string): Observable<Cidadao[]> {
     return this.httpClient.get<Cidadao[]>(environment.rest.host + '/hasmart/api/Cidadaos?rg=' + rg, this.httpOptions)
       .pipe(
         map((data: Cidadao[]) => {
           return data;
         }),
         retry(2),
         catchError(this.handleError));
   }

   public getCidadaoById(cidadaoId: string): Observable<Cidadao> {
     return this.httpClient.get<Cidadao>(environment.rest.host + '/hasmart/api/Cidadaos/' + cidadaoId, this.httpOptions)
       .pipe(
         retry(2),
         catchError(this.handleError));
   }

   // API: POST /HaSmart/api/cidadaos/Relatorio/{id}
public createRelatorio(cidadaoId: string, relatorio: RelatorioOpiniao): Observable<RelatorioOpiniao> {
  // tslint:disable-next-line: max-line-length
  return this.httpClient.post<RelatorioOpiniao>((environment.rest.host + '/hasmart/api/Cidadaos/Relatorio/' + cidadaoId), relatorio, this.httpOptions)
  .pipe(
    catchError(this.handleError));
}

   jaTemosCidadao(id: string) {
     this.getCidadaoById(id).subscribe(cidadao => {
       this.cidadano = cidadao as Cidadao;
       this.selecionadoId = cidadao.id;
       this.router.navigate(['/cidadaos/visualizar/' + id]);

     });

   }
   pegaremosCep(cep: string) {
     return this.httpClient.get<any>('//viacep.com.br/ws/' + cep + '/json/')
     .pipe(
       map((data: any) => {
         return data;
       }),
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
     console.log(error);
     return throwError(error);
   }
}
