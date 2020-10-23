import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-mediclogin',
  templateUrl: './mediclogin.component.html',
  styleUrls: ['./mediclogin.component.scss']
})
export class MedicloginComponent implements OnInit {
  hide = true;
  showPw = false;
  user: string;
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.clearLocalStorage();
    // this.tryAuth();
  }
  tryAuth() {
    // this.apiService.authenticate(this.username, this.password);
    // this.apiService.authenticate().subscribe();
  }
  clearLocalStorage() {
    localStorage.clear();
  }
  createRole() {
    this.apiService.login(this.user);
    this.router.navigate(['medico/visualizar']);

  }
}
