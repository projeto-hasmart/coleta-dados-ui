import { Medicao } from './../../models/medicao';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Cidadao } from 'src/app/models/cidadao';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicaoServiceService {
  selecionadoId: string;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('token'),
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Origin': '*' })
  };
  cidadaos: Array<Cidadao>;
  constructor(private httpClient: HttpClient, private router: Router) {
   }

  // API: GET /cidadaos
  getAllCidadaos(cpf: string): Observable<Cidadao[]> {
    return this.httpClient.get<Cidadao[]>(environment.rest.host + '/hasmart/api/Cidadaos?cpf=' + cpf, this.httpOptions)
      .pipe(
        catchError(this.handleError));
  }
  getCidadaos(): void {


  }
  public createMedicao(medicao: Medicao, id: string): Observable<Medicao> {
    return this.httpClient.post<Medicao>((environment.rest.host + '/hasmart/api/Farmacia/medicoes?cidadaoId=' + id)
      , medicao, this.httpOptions)
      .pipe(
        catchError(this.handleError));
  }
  selecionaCidadao(digitado: string) {
    this.getAllCidadaos(digitado).subscribe(cidadaos => {
      this.cidadaos = cidadaos as Cidadao[];
      for (const cidadao of this.cidadaos) {
        if (cidadao.cpf.includes(digitado) || cidadao.rg.includes(digitado)) {
          this.selecionadoId = cidadao.id;
          this.router.navigate(['/medicao']);
        } else {
        }
      }
    });

  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
    }
    // console.log(errorMessage);
    // console.log(error);
    return throwError(errorMessage);
  }
}
