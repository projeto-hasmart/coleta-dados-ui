import { element } from 'protractor';

import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

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

@Component({
  selector: 'app-pagina-cidadaos-visualizar',
  templateUrl: './pagina-cidadaos-visualizar.component.html',
  styleUrls: ['./pagina-cidadaos-visualizar.component.scss']
})
export class PaginaCidadaosVisualizarComponent implements OnInit {

  dispensacao = 1234567;
  isCollapsed = true;
  constructor() { }
  displayedColumns: string[] = ['data', 'servico', 'responsavel', 'info'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  /* declarando um nome pro property binding do nome dinâmico */
  nome = 'Mateus Palácio testando outro component';
  cpf = '07183864127';
  data = '17/03/2020';
  rg = '20075719122';
  endereco = 'Rua Paulo Coelho, 175';
  complemento = 'Casa 32';
  cidade = 'Forte Grande';
  telefone = '(12) 3456-7890';
  dataNascimento = '30/02/1990';
  estado = 'Ceará';
  genero = 'Masculino';
  altura = '168 cm';
  antiHipertensivo = 'Não';
  diabetes = 'Não';
  avc = 'Não';
  fumante = 'Não';
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


  ngOnInit() {
  }

}
