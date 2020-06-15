import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Hydrogen', symbol: 'H'}
];

@Component({
  selector: 'app-pagina-medicamentos',
  templateUrl: './pagina-medicamentos.component.html',
  styleUrls: ['./pagina-medicamentos.component.scss']
})
export class PaginaMedicamentosComponent implements OnInit {
  displayedColumns: string[] = ['name', 'symbol'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit() {
  }

}
