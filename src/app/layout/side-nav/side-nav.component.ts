import { filter, map } from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized, ActivationEnd, NavigationEnd } from '@angular/router';
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
  routeData;
  constructor( private router: Router,
               private activatedRoute: ActivatedRoute) {
               }
  ngOnInit() {
    $(document).ready(() => {
      $('.sidebar-menu').tree();
    });
    console.log(this.routeData);
    console.log(this.dispensacao);
    console.log(this.medicao);
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
