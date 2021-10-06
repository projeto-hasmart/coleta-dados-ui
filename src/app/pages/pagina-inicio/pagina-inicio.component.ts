import { Medico } from 'src/app/models/medico';
import { User } from './../../models/user';
import { CidadaoServiceService } from './../../services/cidadao/cidadao-service.service';
import { Cidadao } from './../../models/cidadao';
import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { Global } from 'src/app/models/globalConstants';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';

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
  selector: 'app-dash-board',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.scss']
})
// tslint:disable-next-line: component-class-suffix
export class PaginaInicio implements OnInit {
  cidadaos: Cidadao[];
  apiService: ApiService;
  buscado: string;
  cidadaos$: Observable<any[]>;
  cidadaoService: CidadaoServiceService;
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  totalMedicoes: number;
  idk: Global;
  errorBye = false;
  router: Router;
  mask: string;
  user: Medico;

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  constructor(apiService: ApiService, cidadaoService: CidadaoServiceService, idk: Global, router: Router) {
    this.apiService = apiService;
    this.cidadaoService = cidadaoService;
    this.idk = idk;
    this.router = router;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')) as Medico;
  }
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
