import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';
import { Cidadao } from 'src/app/models/cidadao';
import { Global } from 'src/app/models/globalConstants';
import { ApiService } from 'src/app/services/api.service';
import { CidadaoServiceService } from 'src/app/services/cidadao/cidadao-service.service';

@Component({
  selector: 'app-page-medicao',
  templateUrl: './page-medicao.component.html',
  styleUrls: ['./page-medicao.component.scss']
})
export class PageMedicaoComponent implements OnInit {

  isMobile;
  deviceInfo = null;
  cidadaoService: CidadaoServiceService;
  router: Router;
  cidadaos: Cidadao[];
  buscado: string;
  cidadao$: Observable<Cidadao[]>;
  apiService: ApiService;
  idk: Global;
  errorBye = false;
  mask:string;

  constructor(private deviceService: DeviceDetectorService, apiService: ApiService, router: Router, idk: Global, cidadaoService: CidadaoServiceService) {
    this.epicFunction();
    this.apiService = apiService;
    this.router = router;
    this.idk = idk;
    this.cidadaoService = cidadaoService;
   }

  ngOnInit() {
    this.cidadao$ = this.apiService.getCidadaos();
  }

  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    this.isMobile = isMobile;
    const isDesktopDevice = this.deviceService.isDesktop();
  }

searchCidadao(){
  this.cidadaoService.getAllCidadaos(this.buscado).subscribe(cidadao => {
    this.cidadaoService.cidadaos = cidadao as Cidadao[];
    this.cidadaoService.selecionadoId = cidadao[0].id;
    this.router.navigate(['/medicao/' + cidadao[0].id]);
  })
  this.cidadaoService.getCidadaoByNome(this.buscado).subscribe(cidadao => {
    this.cidadaoService.cidadaos = cidadao as Cidadao[];
    this.cidadaos = cidadao as Cidadao[];
    this.cidadaoService.selecionadoId = cidadao[0].id;
    this.router.navigate(['/cidadaos/visualizar/' + cidadao[0].id]);
})
}

}
