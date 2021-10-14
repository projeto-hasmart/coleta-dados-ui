import { RelatorioOpiniao } from './../../../models/relatorioOpiniao';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cidadao } from 'src/app/models/cidadao';
import { CidadaoEdit } from 'src/app/models/cidadaoEdit';
import { ApiService } from 'src/app/services/api.service';
import { CidadaoServiceService } from 'src/app/services/cidadao/cidadao-service.service';
import { DispensacaoServiceService } from 'src/app/services/dispensacao/dispensacao-service.service';
import { MedicaoServiceService } from 'src/app/services/medicao/medicao-service.service';

@Component({
  selector: 'app-pagina-cidadao-relatorio',
  templateUrl: './pagina-cidadao-relatorio.component.html',
  styleUrls: ['./pagina-cidadao-relatorio.component.scss']
})
export class PaginaCidadaoRelatorioComponent implements OnInit {
  checked = false;
  disabled = false;
  isCollapsed = true;
  oNossoCidadao: Cidadao;
  apiService: ApiService;
  cz: CidadaoServiceService;
  mz: MedicaoServiceService;
  cidadao$: Observable<Cidadao>;
  router: Router;
  showingCpf: string;
  showingCep: string;
  showingPhone: string;
  i = 0;
  sendingCpf: string;
  valid = false;
  errorBye = false;
  relatorio: string;
  constructor(cz: CidadaoServiceService, mz: MedicaoServiceService, apiService: ApiService, router: Router) {
    this.cz = cz;
    this.mz = mz;
    this.apiService = apiService;
    this.router = router;
   }
  selection = new SelectionModel<any>(true, []);
  /* declarando um nome pro property binding do nome dinâmico */


  ngOnInit() {
    if (this.cz.selecionadoId === undefined) {
      this.router.navigate(['/cidadaos']);
    } else {
      localStorage.setItem('citizen', this.cz.selecionadoId.toString());
      if ((localStorage.getItem('citizen')) !== undefined) {
      this.apiService.getCidadaoById(this.cz.selecionadoId).subscribe(cidadao => {
      this.oNossoCidadao = cidadao as Cidadao;
      this.cidadao$ = this.apiService.getCidadaoById(this.cz.selecionadoId);
      this.verCpf();
      this.verCep();
      this.verTelefone();
    });
  }
      this.cidadao$ = this.apiService.getCidadaoById(this.cz.selecionadoId);
  }
}
verificaCep(cep: string) {
  if (cep.length === 8) {
    this.cz.pegaremosCep(cep).subscribe(data => {
      this.oNossoCidadao.dadosPessoais.endereco.rua = data.logradouro;
      this.oNossoCidadao.dadosPessoais.endereco.cidade = data.localidade;
      this.oNossoCidadao.dadosPessoais.endereco.estado = data.uf;
    });
  }

}
verTelefone() {
this.i = 0;
while (this.i < 11) {
  if (this.i === 0) {
    this.showingPhone = '(' + this.oNossoCidadao.dadosPessoais.telefone.charAt(this.i);
    this.i++;
  } else if (this.i === 1) {
    this.showingPhone += this.oNossoCidadao.dadosPessoais.telefone.charAt(this.i) + ')';
    this.i++;
  } else if (this.i === 6) {
    this.showingPhone += this.oNossoCidadao.dadosPessoais.telefone.charAt(this.i) + '-';
    this.i++;
  } else {
    this.showingPhone += this.oNossoCidadao.dadosPessoais.telefone.charAt(this.i);
    this.i++;
  }
}
}
verCep() {
  this.i = 0;
  while ( this.i < 8) {
    if (this.i === 4) {
      this.showingCep += this.oNossoCidadao.dadosPessoais.endereco.cep.charAt(this.i) + '-';
      this.i++;
    } else if (this.i === 0) {
      this.showingCep = this.oNossoCidadao.dadosPessoais.endereco.cep.charAt(this.i);
      this.i++;
    } else {
      this.showingCep += this.oNossoCidadao.dadosPessoais.endereco.cep.charAt(this.i);
      this.i++;
    }
  }
}
verCpf() {
  this.i = 0;
  while ( this.i < 11) {
    if (this.i === 2 || this.i === 5 ) {
      this.showingCpf += this.oNossoCidadao.cpf.charAt(this.i) + '.';
      this.i++;
    } else if (this.i === 8) {
      this.showingCpf += this.oNossoCidadao.cpf.charAt(this.i) + '-';
      this.i++;
    } else if (this.i === 0) {
      this.showingCpf = this.oNossoCidadao.cpf.charAt(this.i);
      this.i++;
    } else {
      this.showingCpf += this.oNossoCidadao.cpf.charAt(this.i);
      this.i++;
    }

  }
}

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

}
