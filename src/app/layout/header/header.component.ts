import {Component, OnInit} from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;
  constructor() {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')) as User;

  }

}
