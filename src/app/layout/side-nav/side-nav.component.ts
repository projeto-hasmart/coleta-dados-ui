import { CidadaoServiceService } from './../../services/cidadao/cidadao-service.service';
import { filter, map } from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized, ActivationEnd, NavigationEnd } from '@angular/router';
import { Global } from 'src/app/models/globalConstants';
import { User } from 'src/app/models/user';
declare var $;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  ativo = true;
  atual: string;
  doWeHaveCitizen = false;
  decidirArrumarSuporte = false;
  routeData;
  user: User;
  // tslint:disable-next-line: radix
  idk: string = localStorage.getItem('citizen');
  constructor( private router: Router,
               private activatedRoute: ActivatedRoute,
               idk: CidadaoServiceService) {
                 this.idk = idk.selecionadoId;
               }
  ngOnInit() {

    $(document).ready(() => {
      $('.sidebar-menu').tree();
    });
    this.user = JSON.parse(localStorage.getItem('currentUser')) as User;
  }

  removeCitizen() {
    localStorage.removeItem('citizen');
  }

  refresh(): void {
    window.location.reload();
}
}
