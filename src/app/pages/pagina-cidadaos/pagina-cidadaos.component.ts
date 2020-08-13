import { Router } from '@angular/router';
import { CidadaoServiceService } from './../../services/cidadao/cidadao-service.service';
import { Cidadao } from './../../models/cidadao';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { Global } from 'src/app/models/globalConstants';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
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
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  selection = new SelectionModel<Cidadao>(true, []);
  router: Router;
  errorBye = false;
  constructor(apiService: ApiService, cidadaoService: CidadaoServiceService, router: Router) {
    this.apiService = apiService;
    this.cidadaoService = cidadaoService;
    this.router = router;
  }

  ngOnInit() {
    // tslint:disable-next-line: radix
    if (parseInt(localStorage.getItem('citizen')) !== undefined) {
      // tslint:disable-next-line: radix
      this.cidadaoService.jaTemosCidadao(parseInt(localStorage.getItem('citizen')));
    }
  }

  goToView(groupValue: string) {
    this.selecionaCidadao(this.buscado, groupValue);
  }
  selecionaCidadao(digitado: string, groupValue?: string) {
    if (groupValue === 'cpf') {
      this.cidadaoService.getAllCidadaos(digitado).subscribe(cidadao => {
        this.cidadaoService.cidadaos = cidadao as Cidadao[];
        this.cidadaoService.selecionadoId = cidadao[0].id;
        this.router.navigate(['/cidadaos/visualizar']);
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
        this.router.navigate(['/cidadaos/visualizar']);
      }, err => {
        if (err.error.status === 404) {
          this.errorBye = true;
        }
      });
    }


  }
  newCitizen(groupValue: string) {
    if (groupValue === 'cpf') {
      localStorage.setItem('newCpf', this.buscado);
    } else if (groupValue === 'rg') {
      localStorage.setItem('newRg', this.buscado);
    }
  }
}
