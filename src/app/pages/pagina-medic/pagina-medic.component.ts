import { HttpClient } from '@angular/common/http';
import { Relatorio } from './../../models/relatorio';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { User } from 'src/app/models/user';
import { DeviceDetectorService } from 'ngx-device-detector';



@Component({
  selector: 'app-pagina-medic',
  templateUrl: './pagina-medic.component.html',
  styleUrls: ['./pagina-medic.component.scss']
})
export class PaginaMedicComponent implements OnInit {

  isMobile;
  deviceInfo = null;
  innerWidth;
  innerHeight;
  constructor( private http: HttpClient, private deviceService: DeviceDetectorService) {
    this.epicFunction();
  }
  ngOnInit() {
  }
  @HostListener('window:resize', ['$event'])
onResize(event) {
  this.innerWidth = window.innerWidth;
  this.innerHeight = window.innerHeight;
}
  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    this.isMobile = isMobile;
    const isDesktopDevice = this.deviceService.isDesktop();
  }
}
