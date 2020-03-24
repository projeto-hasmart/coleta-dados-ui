import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
