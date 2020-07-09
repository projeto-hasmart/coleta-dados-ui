import { Medicao } from './../../models/medicao';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Cidadao } from 'src/app/models/cidadao';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicaoServiceService {
  selecionadoId: number;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  cidadaos: Array<Cidadao>;
  constructor(private httpClient: HttpClient, private router: Router) {
   }

  // API: GET /cidadaos
  getAllCidadaos(): Observable<Cidadao[]> {
    return this.httpClient.get<Cidadao[]>('api/hasmart/api/Cidadaos')
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getCidadaos(): void {


  }
  public createMedicao(medicao: Medicao): Observable<Medicao> {
    return this.httpClient.post<Medicao>(('api/hasmart/api/Farmacia/medicoes' + this.selecionadoId), medicao)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  selecionaCidadao(digitado: string) {
    this.getAllCidadaos().subscribe(cidadaos => {
      this.cidadaos = cidadaos as Cidadao[];
      console.log(cidadaos);
      console.log(this.cidadaos);
      for (const cidadao of this.cidadaos) {
        if (cidadao.cpf.includes(digitado) || cidadao.rg.includes(digitado)) {
          this.selecionadoId = cidadao.id;
          this.router.navigate(['/medicao']);
        } else {
          console.log('nope');
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
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
