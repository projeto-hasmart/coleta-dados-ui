import { PaginaCidadaosCadastrarComponent } from './../pagina-cidadaos/pagina-cidadaos-cadastrar/pagina-cidadaos-cadastrar.component';
import { NavigationStart, Router } from '@angular/router';
import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

declare var $;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(private elementRef: ElementRef, @Inject(DOCUMENT) private doc, private router: Router) {
  }

  ngOnInit() {
    const link1: HTMLLinkElement = this.doc.createElement('link');
    link1.setAttribute('rel', 'amphtml');
    link1.setAttribute('href', '../assets/css/bootstrap.min.css');
    this.doc.head.appendChild(link1);

    const link: HTMLLinkElement = this.doc.createElement('link');
    link.setAttribute('rel', 'amphtml');
    link.setAttribute('href', '../assets/css/owl.carousel.css');
    this.doc.head.appendChild(link);


    const s14 = document.createElement('script');
    s14.type = 'text/javascript';
    s14.src = '../assets/js/bootstrap.min.js';
    this.elementRef.nativeElement.appendChild(s14);

    const s1 = document.createElement('script');
    s1.type = 'text/javascript';
    s1.src = '../assets/js/style-switcher.js';
    this.elementRef.nativeElement.appendChild(s1);

    window.dispatchEvent(new Event('resize'));
    $('body').addClass('hold-transition skin-blue sidebar-mini');
  }
  // changePag(){
  //   if( localStorage.getItem('changePag') == 'yes'){
  //     this.router.events.subscribe(event => {
  //       if(event instanceof NavigationStart){
  //         confirm('Deseja realmente trocar de página?');
  //       }
  //     });
  //     }
  // }
  ngOnDestroy(){
    // this.changePag();
  }
}
