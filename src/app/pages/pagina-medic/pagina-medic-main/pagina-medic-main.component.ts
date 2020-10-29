import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Relatorio } from 'src/app/models/relatorio';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-pagina-medic-main',
  templateUrl: './pagina-medic-main.component.html',
  styleUrls: ['./pagina-medic-main.component.scss']
})
export class PaginaMedicMainComponent implements OnInit {
  ELEMENT_DATA: Relatorio[] = [
    {cidadao: 'Hydrogen Monohidratado Saturado da Silva Cãozinho Júnior', medicoesS: 5,
    medicoesR: 1,  telefone: '88999000990', telefonesecundario: '8835141110', cpf: '45645612320', ultimaVisita: '20/10/2020'},
    {cidadao: 'Mateus Uziel Palácio Oliveira', medicoesS: 15,  medicoesR: 15, telefone: '85981560609', cpf: '07283964320',
    ultimaVisita: '29/10/2020'},
    {cidadao: 'Jon Snow Junior dos Santos', medicoesS: 25,  medicoesR: 24, telefone: '88997953655', cpf: '78912330012',
    ultimaVisita: '02/10/2020'},
    {cidadao: 'Lithium Ribeiro', medicoesS: 7,  medicoesR: 4, telefone: '88992168444', cpf: '12345678910', ultimaVisita: '13/09/2020'},
  ];
  medic: User;
  selection = new SelectionModel<Relatorio>(true, []);
  displayedColumns: string[] = ['cidadao', 'ultimaVisita', 'medicoesSolicitadas', 'medicoesRealizadas', 'telefone', 'telefone2', 'cpf'];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  deviceInfo = null;
  isMobile;
  constructor( private http: HttpClient, private deviceService: DeviceDetectorService, private router: Router) {
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
  getRecord(row: any) {
console.log(row);
console.log('kkkk clicou sem nem saber ishhhhhhhhh');
localStorage.setItem('medicCitizen', row);
this.router.navigate(['medico/visualizar/cidadao']);
  }

}
