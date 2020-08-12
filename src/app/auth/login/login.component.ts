import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ApiService } from 'src/app/services/api.service';
import { Cidadao } from 'src/app/models/cidadao';
import { Observable } from 'rxjs';
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
  constructor(apiService: ApiService) {
    this.apiService = apiService;
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

  }
  clearLocalStorage() {
    localStorage.clear();
  }
  ngOnDestroy(): void {
    $('body').removeClass('hold-transition login-page');
  }


}
