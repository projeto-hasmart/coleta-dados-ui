import { MedicaoServiceService } from './../../../services/medicao/medicao-service.service';
import { Observable } from 'rxjs';
import { ApiService } from './../../../services/api.service';
import { Cidadao } from './../../../models/cidadao';
import { CidadaoServiceService } from './../../../services/cidadao/cidadao-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';

import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DispensacaoServiceService } from 'src/app/services/dispensacao/dispensacao-service.service';
import { Medicao } from 'src/app/models/medicao';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
interface Diabetes {
  value: string;
  viewValue: string;
}
interface Fumante {
  value: string;
  viewValue: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'}
];
const MEDICAO: Medicao[] = [];

@Component({
  selector: 'app-pagina-cidadaos-visualizar',
  templateUrl: './pagina-cidadaos-visualizar.component.html',
  styleUrls: ['./pagina-cidadaos-visualizar.component.scss']
})
export class PaginaCidadaosVisualizarComponent implements OnInit {
  checked = false;
  disabled = false;
  dispensacao = 1234567;
  isCollapsed = true;
  oNossoCidadao: Cidadao;
  apiService: ApiService;
  cz: CidadaoServiceService;
  mz: MedicaoServiceService;
  dz: DispensacaoServiceService;
  cidadao$: Observable<Cidadao>;
  router: Router;
  weight;
  constructor(cz: CidadaoServiceService, mz: MedicaoServiceService, dz: DispensacaoServiceService, apiService: ApiService, router: Router) {
    this.cz = cz;
    this.mz = mz;
    this.dz = dz;
    this.apiService = apiService;
   }
  displayedColumns: string[] = ['data', 'servico', 'responsavel', 'info'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  /* declarando um nome pro property binding do nome dinâmico */

  color = 'green';
  diabetess: Diabetes[] = [
    {value: 'tipo-1', viewValue: 'Tipo 1'},
    {value: 'tipo-2', viewValue: 'Tipo 2'},
    {value: 'tipo-3', viewValue: 'Tipo 3'}
  ];
  fumantes: Fumante[] = [
    {value: 'naofumante', viewValue: 'Não fumante'},
    {value: 'fumante', viewValue: 'Fumante'}
  ];
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

  updateCz(cidadaoEditado: Cidadao) {
    this.apiService.updateCidadao(cidadaoEditado);
  }

  ngOnInit() {
    if (this.cz.selecionadoId === undefined) {
      this.router.navigate(['/cidadaos']);
    } else {
    this.apiService.getCidadaoById(this.cz.selecionadoId).subscribe(cidadao => {
      this.oNossoCidadao = cidadao as Cidadao;
      console.log(cidadao);
      console.log(this.oNossoCidadao);
      this.weight =  this.oNossoCidadao.medicoes[this.oNossoCidadao.medicoes.length - 1].peso;
    });
    this.cidadao$ = this.apiService.getCidadaoById(this.cz.selecionadoId);
  }
}
goToView() {
  this.mz.selecionaCidadao(this.oNossoCidadao.cpf);
}

}
