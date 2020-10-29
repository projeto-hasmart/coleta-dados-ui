import { HttpClient } from '@angular/common/http';
import { Relatorio } from './../../models/relatorio';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
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

  constructor( private http: HttpClient, private deviceService: DeviceDetectorService) {
    this.epicFunction();
  }
  ngOnInit() {
  }
  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    this.isMobile = isMobile;
    const isDesktopDevice = this.deviceService.isDesktop();
  }
}
