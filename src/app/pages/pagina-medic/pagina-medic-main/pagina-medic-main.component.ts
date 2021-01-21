import { Cidadao } from './../../../models/cidadao';
import { MedicoService } from './../../../services/medico/medico.service';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Relatorio } from 'src/app/models/relatorio';
import { User } from 'src/app/models/user';
import { Medico } from 'src/app/models/medico';

@Component({
  selector: 'app-pagina-medic-main',
  templateUrl: './pagina-medic-main.component.html',
  styleUrls: ['./pagina-medic-main.component.scss']
})
export class PaginaMedicMainComponent implements OnInit {
  ELEMENT_DATA: Cidadao[] = [
  ];
  medic: User;
  oNossoMedico: Medico;
  selection = new SelectionModel<Relatorio>(true, []);
  displayedColumns: string[] = ['cidadao', 'ultimaVisita', 'medicoesSolicitadas', 'medicoesRealizadas', 'telefone', 'telefone2', 'cpf'];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  deviceInfo = null;
  isMobile;
  constructor( private http: HttpClient, private deviceService: DeviceDetectorService, private router: Router,
               private medicoService: MedicoService) {
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
    this.medicoService.getMedicoById(this.medic.crm).subscribe(medico => {
      this.oNossoMedico = medico as Medico;
      this.getCidadaos();
    });
  }
  getRecord(row: any) {
localStorage.setItem('medicCitizen', row);
this.router.navigate(['medico/visualizar/cidadao']);
  }
  getCidadaos() {
  this.ELEMENT_DATA = [];
  for (const med of this.oNossoMedico.cidadaosAtuais) {
    this.ELEMENT_DATA.push(med);
  }

  this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  }

}
