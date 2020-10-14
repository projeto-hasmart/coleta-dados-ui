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
  ELEMENT_DATA: Relatorio[] = [
    {cidadao: 'Hydrogen Monohidratado Saturado da Silva Cãozinho Júnior', medicoesS: 5,
    medicoesR: 1,  telefone: '88999000990', telefonesecundario: '8835141110'},
    {cidadao: 'Mateus Uziel Palácio Oliveira', medicoesS: 15,  medicoesR: 15, telefone: '85981560609'},
    {cidadao: 'Jon Snow Junior dos Santos', medicoesS: 25,  medicoesR: 24, telefone: '88997953655'},
    {cidadao: 'Lithium Ribeiro', medicoesS: 7,  medicoesR: 4, telefone: '88992168444'},
  ];
  medic: User;
  selection = new SelectionModel<Relatorio>(true, []);
  displayedColumns: string[] = ['cidadao', 'medicoesSolicitadas', 'medicoesRealizadas', 'telefone', 'telefone2', 'download'];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  deviceInfo = null;
  isMobile;

  constructor( private http: HttpClient, private deviceService: DeviceDetectorService) {
    this.epicFunction();
  }
  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    this.isMobile = isMobile;
    const isDesktopDevice = this.deviceService.isDesktop();
  }
  ngOnInit() {
    this.medic = JSON.parse(localStorage.getItem('currentUser')) as User;
  }

}
