import { Component, OnInit } from '@angular/core';
import { CidadaoServiceService } from 'src/app/services/cidadao/cidadao-service.service';
import { Cidadao } from 'src/app/models/cidadao';

@Component({
  selector: 'app-pagina-medicao-sucesso',
  templateUrl: './pagina-medicao-sucesso.component.html',
  styleUrls: ['./pagina-medicao-sucesso.component.scss']
})
export class PaginaMedicaoSucessoComponent implements OnInit {
  cz: CidadaoServiceService;
  oNossoCidadao: Cidadao;

  constructor(  cz: CidadaoServiceService) {
    this.cz = cz;
   }

  ngOnInit() {
  }
  goToView() {
    this.cz.selecionaCidadao(this.oNossoCidadao.cpf);
    }
}
