import { Router } from '@angular/router';
import { Cidadao } from './../models/cidadao';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
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
  Authorization: 'Bearer ' + localStorage.getItem('token') } )
};
statusCode: number;
cidadaos: Array<Cidadao>;


// API: GET /cidadaos
getAllCidadaos(): Observable<Cidadao[]> {
  return this.httpClient.get<Cidadao[]>('api/hasmart/api/Cidadaos', this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}

// API: POST /HaSmart/api/cidadaos
public createCidadao(cidadao: Cidadao): Observable<Cidadao> {
  return this.httpClient.post<Cidadao>(('api/hasmart/api/Cidadaos'), cidadao, this.httpOptions)
  .pipe(
    catchError(this.handleError));
}

// API: GET /cidadaos/:id
public getCidadaoById(cidadaoId: number): Observable<Cidadao> {
  return this.httpClient.get<Cidadao>('api/hasmart/api/Cidadaos/' + cidadaoId, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}

// API: PUT /cidadaos/:id
public updateCidadao(cidadao: CidadaoEdit, id: number): Observable<any> {
  return this.httpClient.put(('api/hasmart/api/Cidadaos/' + id), cidadao, this.httpOptions)
    .pipe(
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
login(usernameForLogin?: string, password?: string) {
  if (usernameForLogin === 'admin') {
    this.user = {
      username: usernameForLogin,
      role: Role.Admin
    };
    localStorage.setItem('currentUser', 'admin');
    // this.router.navigate(['/admin']);
    console.log('AMIGUINHO VOCÊ É ADMIN TAOKEY');
  } else if (usernameForLogin === 'user') {
    this.user = {
      username: usernameForLogin,
      role: Role.User
    };
    localStorage.setItem('currentUser', 'user');
    console.log('AMIGUINHO VOCÊ É USER TAOKEY');
    // this.currentUserSubject.next(this.user);

  }
}
authenticate(): Observable<any> {
const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
const body = new URLSearchParams();
body.set('grant_type', 'client_credentials');
body.set('client_id', 'admin');
body.set('client_secret', 'admin');

return this.httpClient.post<any>('auth/connect/token', body.toString(), {
  headers
}).pipe(
  map(jwt => {
    if (jwt && jwt.access_token) {
      console.log(jwt);
      localStorage.setItem('token', jwt.access_token.toString());
    }
  })
);
}
}
