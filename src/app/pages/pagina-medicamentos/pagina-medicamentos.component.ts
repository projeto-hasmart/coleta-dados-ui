import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Anlodipino Besilato', symbol: 'Comprimido 5mg'},
  {name: 'Losartana Potássica', symbol: 'Comprimido 50mg'},
  {name: 'Atenolol', symbol: 'Comprimido 50mg'},
  {name: 'Carvedilol', symbol: 'Comprimidos 6,25mg'},
  {name: 'Carvedilol', symbol: 'Comprimidos 25mg'},
  {name: 'Propanolol Cloridato', symbol: 'Comprimido 40mg'},
  {name: 'Enalapril Maleato', symbol: 'Comprimido 20mg'},
  {name: 'Espironolactona', symbol: 'Comprimido 25mg'},
  {name: 'Furosemida', symbol: 'Comprimido 40mg'},
  {name: 'Hidroclorotiazida', symbol: 'Comprimido 25mg'},
  {name: 'Metildopa', symbol: 'Comprimido 250mg'}
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
