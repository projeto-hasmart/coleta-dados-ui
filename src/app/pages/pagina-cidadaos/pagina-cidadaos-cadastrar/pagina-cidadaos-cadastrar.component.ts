import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

interface Diabetes {
  value: string;
  viewValue: string;
}
interface Fumante {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-pagina-cidadaos-cadastrar',
  templateUrl: './pagina-cidadaos-cadastrar.component.html',
  styleUrls: ['./pagina-cidadaos-cadastrar.component.scss']
})

export class PaginaCidadaosCadastrarComponent implements OnInit {
  color = 'green';

  constructor() { }
  diabetess: Diabetes[] = [
    {value: 'tipo-1', viewValue: 'Tipo 1'},
    {value: 'tipo-2', viewValue: 'Tipo 2'},
    {value: 'tipo-3', viewValue: 'Tipo 3'}
  ];
  fumantes: Fumante[] = [
    {value: 'naofumante', viewValue: 'Não fumante'},
    {value: 'fumante', viewValue: 'Fumante'}
  ];
  ngOnInit() {
  }
}
