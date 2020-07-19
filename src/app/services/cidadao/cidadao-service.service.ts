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
  selecionaCidadao(digitado: string) {
    this.getAllCidadaos().subscribe(cidadaos => {
      this.cidadaos = cidadaos as Cidadao[];
      for (const cidadao of this.cidadaos) {
        if (cidadao.cpf.includes(digitado) || cidadao.rg.includes(digitado)) {
          this.selecionadoId = cidadao.id;
          this.router.navigate(['/cidadaos/visualizar']);
        } else {
          console.log('nope');
        }
      }
    });

  }
  jaTemosCidadao(id: number) {
    this.getAllCidadaos().subscribe(cidadaos => {
      this.cidadaos = cidadaos as Cidadao[];
      for (const cidadao of this.cidadaos) {
        if (cidadao.id === id ) {
          this.selecionadoId = cidadao.id;
          this.router.navigate(['/cidadaos/visualizar']);
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
