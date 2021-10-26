import { MedicaoServiceService } from 'src/app/services/medicao/medicao-service.service';
import { Router } from '@angular/router';
import { CidadaoServiceService } from './../../services/cidadao/cidadao-service.service';
import { Cidadao } from './../../models/cidadao';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { Global } from 'src/app/models/globalConstants';


let ELEMENT_DATA: any[] = [
];

@Component({
  selector: 'app-pagina-cidadaos',
  templateUrl: './pagina-cidadaos.component.html',
  styleUrls: ['./pagina-cidadaos.component.scss']
})
export class PaginaCidadaosComponent implements OnInit {
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
  constructor(apiService: ApiService, cidadaoService: CidadaoServiceService, private mz: MedicaoServiceService, router: Router) {
    this.apiService = apiService;
    this.cidadaoService = cidadaoService;
    this.router = router;
  }

  ngOnInit() {
    // tslint:disable-next-line: radix
    if (localStorage.getItem('citizen') !== undefined) {
      // tslint:disable-next-line: radix
      this.cidadaoService.jaTemosCidadao(localStorage.getItem('citizen'));
    }
    }

    checkIt(groupValue: string) {
      if (groupValue === 'cpf') {
        this.mask = '000.000.000-00';
      } else {
        this.mask = '00000000000';
      }
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
