import { Medico } from 'src/app/models/medico';
import { ResolveStart, Router } from '@angular/router';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ApiService } from 'src/app/services/api.service';
import { Cidadao } from 'src/app/models/cidadao';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/role';
declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  showPw = false;
  cidadaos: Cidadao[];
  cidadaos$: Observable<any[]>;
  apiService: ApiService;
  user: string;
  pw: string;
  operador: Medico;
  notFound = false;

  constructor(apiService: ApiService, private router: Router) {
    this.apiService = apiService;
            // redirect to home if already logged in
    // if (this.apiService.currentUserValue) {
    //       this.router.navigate(['/inicio']);
    // }
  }

  ngOnInit() {
/*     $('body').addClass('hold-transition login-page');
    $(() => {
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%'
      });
    }); */
    this.clearLocalStorage();
    // this.tryAuth();

  }
  clearLocalStorage() {
    localStorage.clear();
  }
  createRole() {
    this.operador = {
      nome: this.user,
      senha: this.pw
    };
    this.apiService.authenticate(this.operador).subscribe(op => {
      this.operador = op as Medico;
      this.router.navigate(['/inicio']);
    }, err => {
      this.notFound = true;
    });
  }
  // tryAuth() {
  //   // this.apiService.authenticate(this.username, this.password);
  //   this.apiService.authenticate().subscribe();
  // }
  ngOnDestroy(): void {
    $('body').removeClass('hold-transition login-page');
  }


}
