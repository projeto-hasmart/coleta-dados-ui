import { Component, OnInit } from '@angular/core';
import { Cidadao } from 'src/app/models/cidadao';
import { Observable } from 'rxjs';
import { CidadaoServiceService } from 'src/app/services/cidadao/cidadao-service.service';
import { Router } from '@angular/router';
import { RelatorioOpiniao } from './../../../models/relatorioOpiniao';

@Component({
  selector: 'app-info-relato',
  templateUrl: './info-relato.component.html',
  styleUrls: ['./info-relato.component.scss']
})
export class InfoRelatoComponent implements OnInit {
  relatorio: string;
  cidadao$: Observable<Cidadao>;
  value = 'Relato';
  oNossoCidadao: Cidadao;
  cz: CidadaoServiceService;
  router: Router;
  valid: boolean;
  errorBye: boolean;

  async CadastraRelatorio() {
    const r: RelatorioOpiniao = {
      relatorioCidadao: this.relatorio
    };
    this.cz.createRelatorio(this.cz.selecionadoId, r).subscribe(
      res => {
        this.valid = true;
        this.goToView();
      },
      err => {
        this.errorBye = true;
        this.valid = false;
      });
  }
  goToView() {
    this.cz.getAllCidadaos(this.oNossoCidadao.cpf).subscribe(cidadao => {
      this.cz.cidadaos = cidadao as Cidadao[];
      this.cz.selecionadoId = cidadao[0].id;
      this.router.navigate(['/cidadaos/visualizar/' + this.cz.selecionadoId]);
    });
  }

  constructor() { }

  ngOnInit() {
  }

}
