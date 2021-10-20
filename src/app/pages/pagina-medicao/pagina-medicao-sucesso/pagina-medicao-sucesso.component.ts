import { ApiService } from './../../../services/api.service';
import { Router } from '@angular/router';
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
  api: ApiService;
  oNossoCidadao: Cidadao;
  router: Router;
  constructor(  cz: CidadaoServiceService, api: ApiService, router: Router) {
    this.cz = cz;
    this.router = router;
    this.api = api;
   }

  ngOnInit() {
    this.api.getCidadaoById(this.cz.selecionadoId).subscribe(cidadao => {
      this.oNossoCidadao = cidadao as Cidadao;
    });
  }
  goToView() {
    this.selecionaCidadao(this.oNossoCidadao.cpf, 'cpf');
  }
  selecionaCidadao(digitado: string, groupValue?: string) {
    if (groupValue === 'cpf') {
        this.router.navigate(['/cidadaos/visualizar/' + this.oNossoCidadao.id]);
    } else if (groupValue === 'rg') {
      // this.cz.getCidadaos(digitado).subscribe(cidadao => {
      //   this.cz.cidadaos = cidadao as Cidadao[];
      //   this.cz.selecionadoId = cidadao[0].id;
        this.router.navigate(['/cidadaos/visualizar/' + this.oNossoCidadao.id]);
     // });
    }
  }
}
