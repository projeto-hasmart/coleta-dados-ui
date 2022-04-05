import {Component, OnInit} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;
  mostraVelho = false;
  isMobile;
  deviceInfo = null;

  constructor(private deviceService: DeviceDetectorService) {
    this.epicFunction();
  }

  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    this.isMobile = isMobile;
    const isDesktopDevice = this.deviceService.isDesktop();
    }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')) as User;

  }

}
