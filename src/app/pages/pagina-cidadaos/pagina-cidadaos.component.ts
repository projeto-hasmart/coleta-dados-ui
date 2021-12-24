import { Cidadao } from 'src/app/models/cidadao';
import { async } from '@angular/core/testing';
import { MedicaoServiceService } from 'src/app/services/medicao/medicao-service.service';
import { Router } from '@angular/router';
import { CidadaoServiceService } from './../../services/cidadao/cidadao-service.service';
import { Component, HostListener, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { Global } from 'src/app/models/globalConstants';
import { DeviceDetectorService } from 'ngx-device-detector';
import { PeriodicElement } from '../pagina-dispensacao/pagina-dispensacao.component';

let ELEMENT_DATA: any[] = [
];

@Component({
  selector: 'app-pagina-cidadaos',
  templateUrl: './pagina-cidadaos.component.html',
  styleUrls: ['./pagina-cidadaos.component.scss']
})
export class PaginaCidadaosComponent implements OnInit {
  isMobile;
  deviceInfo = null;
  innerWidth;
  innerHeight;
  ativo = true;
  clicked = false;
  apiService: ApiService;
  cidadaoService: CidadaoServiceService;
  buscado: string;
  buscadoNome: string;
  displayedColumns: string[] = ['nome', 'nomeanonimo', 'detalhes']; // 'medicoes',
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  selection = new SelectionModel<Cidadao>(true, []);
  router: Router;
  errorBye = false;
  mask: string;
  cidadaos: Cidadao[];

  constructor(apiService: ApiService, cidadaoService: CidadaoServiceService, private mz: MedicaoServiceService, router: Router, private deviceService: DeviceDetectorService) {
    this.apiService = apiService;
    this.cidadaoService = cidadaoService;
    this.router = router;
    this.epicFunction();
  }

  ngOnInit() {
    localStorage.removeItem('changePag');
    // tslint:disable-next-line: radix
    if (localStorage.getItem('citizen') !== undefined) {
      // tslint:disable-next-line: radix
      this.cidadaoService.jaTemosCidadao(localStorage.getItem('citizen'));
    }
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

    noClick(){
      this.clicked = true;
    }

    checkIt(groupValue: string) {
      if (groupValue === 'cpf') {
        this.mask = '000.000.000-00';
      } else {
        this.mask = '00000000000';
      }
    }

    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => this.selection.select(row));
    }

    checkboxLabel(row?: PeriodicElement): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }

    selecionaCidadao(digitado: string, groupValue?: string) {
      if (groupValue === 'cpf') {
        this.cidadaoService.getAllCidadaos(this.buscado).subscribe(cidadao => {
        this.cidadaoService.cidadaos = cidadao as Cidadao[];
        this.cidadaoService.selecionadoId = cidadao[0].id;
        this.router.navigate(['/cidadaos/visualizar/' + cidadao[0].id]);
      },
      err => {
        if (err.error.status === 404) {
          this.errorBye = true;
        }
      });
    } else if (groupValue === 'rg') {
      this.cidadaoService.getCidadaos(digitado).subscribe(cidadao => {
        this.cidadaoService.cidadaos = cidadao as Cidadao[];
        this.cidadaoService.selecionadoId = cidadao[0].id;
        this.router.navigate(['/cidadaos/visualizar/' + cidadao[0].id]);
      }, err => {
        if (err.error.status === 404) {
          this.errorBye = true;
        }
      });
    } else if (groupValue === 'nome') {
      this.cidadaoService.getCidadaoByNome(digitado).subscribe(cidadao => {
        this.cidadaoService.cidadaos = cidadao as Cidadao[];
        this.cidadaos = cidadao as Cidadao[];
        this.getCidadaos();
      }, err => {
        if (err.error.status === 404) {
          this.errorBye = true;
        }
      });
  } else if (groupValue === 'nomeano') {
    this.cidadaoService.getCidadaoByNomeAnonimo(digitado).subscribe(cidadao => {
      this.cidadaoService.cidadaos = cidadao as Cidadao[];
      this.cidadaos = cidadao as Cidadao[];
      this.getCidadaos();
    }, err => {
      if (err.error.status === 404) {
        this.errorBye = true;
      }
    });
  }
}
goToView(cpf: string) {
  this.cidadaoService.getAllCidadaos(cpf).subscribe(cidadao => {
    this.cidadaoService.cidadaos = cidadao as Cidadao[];
    this.cidadaoService.selecionadoId = cidadao[0].id;
    this.router.navigate(['/cidadaos/visualizar/' + this.cidadaoService.selecionadoId]);
  });
}

getCidadaos() {
  ELEMENT_DATA = [];
  for (const cit of this.cidadaos) {
    ELEMENT_DATA.push(cit);
  }

  this.dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
}


  newCitizen(groupValue: string) {
    if (groupValue === 'cpf') {
      localStorage.setItem('newCpf', this.buscado);
    } else if (groupValue === 'rg') {
      localStorage.setItem('newRg', this.buscado);
    }
  }
}
