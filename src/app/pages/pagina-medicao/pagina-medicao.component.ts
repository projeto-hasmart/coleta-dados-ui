import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'}
];

@Component({
  selector: 'app-pagina-medicao',
  templateUrl: './pagina-medicao.component.html',
  styleUrls: ['./pagina-medicao.component.scss']
})
export class PaginaMedicaoComponent implements OnInit {
  nome = 'Mateus Palácio';
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

  peso: number;
  displayedColumns: string[] = ['select',  'sistolica', 'diastolica'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

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

  onKey(event: any) { // without type info
    this.peso += event.target.value;
  }

  excluirAfericao() {

  }
  constructor() { }

  ngOnInit() {
  }

}
