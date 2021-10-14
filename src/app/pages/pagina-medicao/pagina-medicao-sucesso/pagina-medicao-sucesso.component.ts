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
  oNossoCidadao: Cidadao;
  router: Router;
  constructor(  cz: CidadaoServiceService, router: Router) {
    this.cz = cz;
    this.router = router;
   }

  ngOnInit() {
  }
  goToView() {
    this.selecionaCidadao(this.oNossoCidadao.cpf, 'cpf');
  }
  selecionaCidadao(digitado: string, groupValue?: string) {
    if (groupValue === 'cpf') {
      this.cz.getAllCidadaos(digitado).subscribe(cidadao => {
        this.cz.cidadaos = cidadao as Cidadao[];
        this.cz.selecionadoId = cidadao[0].id;
        this.router.navigate(['/cidadaos/visualizar/' + this.cz.selecionadoId]);
      });
    } else if (groupValue === 'rg') {
      this.cz.getCidadaos(digitado).subscribe(cidadao => {
        this.cz.cidadaos = cidadao as Cidadao[];
        this.cz.selecionadoId = cidadao[0].id;
        this.router.navigate(['/cidadaos/visualizar/' + this.cz.selecionadoId]);
      });
    }
  }
}
