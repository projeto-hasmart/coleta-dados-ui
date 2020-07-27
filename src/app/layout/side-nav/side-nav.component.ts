import { CidadaoServiceService } from './../../services/cidadao/cidadao-service.service';
import { filter, map } from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized, ActivationEnd, NavigationEnd } from '@angular/router';
import { Global } from 'src/app/models/globalConstants';
declare var $;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  ativo = true;
  atual: string;
  medicao = false;
  dispensacao = false;
  doWeHaveCitizen = false;
  routeData;
  // tslint:disable-next-line: radix
  idk: number = parseInt(localStorage.getItem('citizen'));
  constructor( private router: Router,
               private activatedRoute: ActivatedRoute,
               idk: CidadaoServiceService) {
                 this.idk = idk.selecionadoId;
               }
  ngOnInit() {

    $(document).ready(() => {
      $('.sidebar-menu').tree();
    });
    if (this.routeData === 'medicao') {
      this.medicao = true;
    }
    if (this.routeData === 'dispensacao') {
      this.dispensacao = true;
    }
  }

  refresh(): void {
    window.location.reload();
}
}
