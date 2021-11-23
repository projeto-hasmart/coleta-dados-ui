import { RelatoService } from './../../../services/relato/relato.service';
import { Cidadao } from './../../../models/cidadao';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RelatorioOpiniao } from 'src/app/models/relatorioOpiniao';
import { CidadaoServiceService } from 'src/app/services/cidadao/cidadao-service.service';

@Component({
  selector: 'app-info-relato',
  templateUrl: './info-relato.component.html',
  styleUrls: ['./info-relato.component.scss']
})
export class InfoRelatoComponent implements OnInit {
  relatorio: string;
  tipoContato;
  cidadao$: Observable<Cidadao>;
  value = 'Relato';
  oNossoCidadao: Cidadao;
  router: Router;
  valid: boolean;
  errorBye: boolean;
  contatos: string[] = [
    'WhatsApp',
    'Ligação',
    'SMS',
    'Presencial',
    'E-mail',
    'Martha'
  ];

  async CadastraRelatorio() {
    const r: RelatorioOpiniao = {
      relatorioCidadao: this.relatorio
    };
    this.rz.createRelato(this.cz.selecionadoId, r).subscribe(
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

  constructor(private cz: CidadaoServiceService, private rz: RelatoService) { }

  ngOnInit() {
  }
}
