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
  position: string;
  weight: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 'cell A1', name: 'cell A1', weight: 'cell A1', symbol: 'cell A1'},
  {position: 'cell A1', name: 'cell A1', weight: 'cell A1', symbol: 'cell A1'},
  {position: 'cell A1', name: 'cell A1', weight: 'cell A1', symbol:'cell A1'},
  {position: 'cell A1', name: 'cell A1', weight: 'cell A1', symbol: 'cell A1'},
  {position: 'cell A1', name: 'cell A1', weight: 'cell A1', symbol: 'cell A1'},
  {position: 'cell A1', name: 'cell A1', weight: 'cell A1', symbol: 'cell A1'},
  {position: 'cell A1', name: 'cell A1', weight: 'cell A1', symbol: 'cell A1'},
  {position: 'cell A1' ,name: 'cell A1', weight: 'cell A1', symbol: 'cell A1'},
  {position: 'cell A1' ,name: 'cell A1', weight: 'cell A1', symbol: 'cell A1'},
  {position: 'cell A1' ,name: 'cell A1', weight: 'cell A1', symbol:'cell A1'},
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
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  router: Router;
  errorBye = false;
  mask: string;
  constructor(apiService: ApiService, cidadaoService: CidadaoServiceService, router: Router) {
    this.apiService = apiService;
    this.cidadaoService = cidadaoService;
    this.router = router;
  }

  ngOnInit() {
    // tslint:disable-next-line: radix
    if (parseInt(localStorage.getItem('citizen')) !== undefined) {
      // tslint:disable-next-line: radix
      this.cidadaoService.jaTemosCidadao(localStorage.getItem('citizen'));
    }
    }

    /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    //this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: PeriodicElement): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // }

    checkIt(groupValue: string) {
      if (groupValue === 'cpf') {
        this.mask = '000.000.000-00';
      } else {
        this.mask = '00000000000';
      }
    }
    goToView(groupValue: string) {
      this.selecionaCidadao(this.buscado, groupValue);
    }
    selecionaCidadao(digitado: string, groupValue?: string) {
      if (groupValue === 'cpf') {
        this.cidadaoService.getAllCidadaos(this.buscado).subscribe(cidadao => {
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
