import { CsvFile } from './../models/csvFile';
import { Medico } from 'src/app/models/medico';
import { environment } from './../../environments/environment';
import { Router, RouterState } from '@angular/router';
import { Cidadao } from './../models/cidadao';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { CidadaoEdit } from '../models/cidadaoEdit';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private currentUserSubject: BehaviorSubject<User>;
  user: User;
  currentUser: Observable<User>;
  role: string;
  constructor(private httpClient: HttpClient, private router: Router) { }
  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Response-Type': 'text',
  Authorization: 'Bearer ' + localStorage.getItem('token'),
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  'Access-Control-Allow-Origin': '*' } )
};
statusCode: number;
cidadaos: Array<Cidadao>;


// API: GET /cidadaos
getCidadaosAsync(): Observable<Cidadao[]> {
  return this.httpClient.get<Cidadao[]>(environment.rest.host + '/hasmart/api/Cidadaos', this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}

getCidadaos(): Observable<Cidadao[]> {
  return this.httpClient.get<Cidadao[]>(environment.rest.host + '/hasmart/api/Cidadaos/GetAll', this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}

// API: POST /HaSmart/api/cidadaos
public createCidadao(cidadao: Cidadao): Observable<Cidadao> {
  return this.httpClient.post<Cidadao>((environment.rest.host + '/hasmart/api/Cidadaos'), cidadao, this.httpOptions)
  .pipe(
    catchError(this.handleError));
}

// API: GET /cidadaos/:id
public getCidadaoById(cidadaoId: string): Observable<Cidadao> {
  return this.httpClient.get<Cidadao>(environment.rest.host + '/hasmart/api/Cidadaos/' + cidadaoId, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}

// API: PUT /cidadaos/:id
public updateCidadao(cidadao: CidadaoEdit, id: string): Observable<any> {
  return this.httpClient.put((environment.rest.host + '/hasmart/api/Cidadaos/' + id), cidadao, this.httpOptions)
    .pipe(
    retry(2),
    catchError(this.handleError));
}

public uploadFile(file: CsvFile): Observable<Cidadao[]> {

  const formData = new FormData();
  formData.append('file', file.File);
  const headersToSend = new HttpHeaders();
  /** In Angular 5, including the header Content-Type can invalidate your request */
  const optionsUpload = {
    headers: headersToSend
  };
  return this.httpClient.post<Array<Cidadao>>(`${environment.rest.host}/hasmart/api/Cidadaos/CSV`, formData, optionsUpload).pipe(
    retry(2),
    catchError(this.handleError));

}

public authenticate(op: Medico): Observable<Medico> {
    this.httpClient.post<Medico>((environment.rest.host + '/hasmart/api/Medico/operador'), op, this.httpOptions).subscribe(res => {
      localStorage.setItem('currentUser', JSON.stringify(res));
      return res;
    }, err => {
      this.handleError(err);
    });
    return this.httpClient.post<Medico>((environment.rest.host + '/hasmart/api/Medico/operador'), op, this.httpOptions) .pipe(
      retry(2),
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
login(usernameForLogin: string, passwordForLogin: string, emailForLogin:string) {
  // if (usernameForLogin === 'admin') {
  //   this.authenticate(usernameForLogin).subscribe(date => {
  //     this.user = {
  //       username: usernameForLogin,
  //       role: Role.Admin,
  //       firstName: 'Fábio',
  //       lastName: 'Martins'
  //     };
  //     localStorage.setItem('currentUser', JSON.stringify(this.user));
  //   }, err => {
  //     localStorage.setItem('authenticationError', 'yes');

  //   });
  //   // this.router.navigate(['/admin']);
  // }
    const op: Medico = {
      nome: usernameForLogin,
      senha: passwordForLogin,
      email: emailForLogin
    };
    this.authenticate(op).subscribe(res => {
      this.user = {
        username: usernameForLogin || emailForLogin,
        id: res.id,
        password: passwordForLogin,
        role: Role.User,
        firstName: res.nome
        // ,lastName: 'Andrade'
      };
      localStorage.setItem('currentUser', JSON.stringify(this.user));
    }, err => {
      localStorage.setItem('authenticationError', 'yes');
    });
    // this.currentUserSubject.next(this.user);


}


}
