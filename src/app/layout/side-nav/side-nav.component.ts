import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

declare var $;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  ativo = true;
  constructor() {}

  ngOnInit() {
    $(document).ready(() => {
      $('.sidebar-menu').tree();
    });
  }
  refresh(): void {
    window.location.reload();
}
}
