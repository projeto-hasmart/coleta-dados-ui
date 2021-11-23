import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styleUrls: ['./menu-mobile.component.scss']
})
export class MenuMobileComponent implements OnInit {

  ativo = true;
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

  removeCitizen() {
    localStorage.removeItem('citizen');
  }

}
