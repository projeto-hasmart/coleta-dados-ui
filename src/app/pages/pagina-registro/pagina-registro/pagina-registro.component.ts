import { element } from 'protractor';
import { RelatorioOpiniao } from './../../../models/relatorioOpiniao';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatYearView } from '@angular/material';
import { Router, RouterLinkWithHref } from '@angular/router';
import { Observable } from 'rxjs';
import { Cidadao } from 'src/app/models/cidadao';
import { CidadaoEdit } from 'src/app/models/cidadaoEdit';
import { ApiService } from 'src/app/services/api.service';
import { CidadaoServiceService } from 'src/app/services/cidadao/cidadao-service.service';
import { DispensacaoServiceService } from 'src/app/services/dispensacao/dispensacao-service.service';
import { MedicaoServiceService } from 'src/app/services/medicao/medicao-service.service';
import { isDate } from 'util';
import { Input } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

export interface PeriodicElement {
  relator: string;
  tipoRelato: string;
  anomizado: string;
  time: Date;
  relato: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {relator:'img', tipoRelato: 'cel.icon', anomizado: 'paciente 1', time: new Date(), relato: true},
  {relator: 'img', tipoRelato: 'cel.icon', anomizado: 'paciente 2', time: new Date(), relato: true},
  {relator: 'img', tipoRelato: 'cel.icon', anomizado: 'paciente 3', time: new Date(), relato: true},
  {relator: 'img', tipoRelato: 'cel.icon', anomizado: 'paciente 4', time: new Date(), relato: true},
  {relator: 'img', tipoRelato: 'cel.icon', anomizado: 'paciente 5', time: new Date(), relato: true},
  {relator: 'img', tipoRelato: 'cel.icon', anomizado: 'paciente 6', time: new Date(), relato: true},

];

@Component({
  selector: 'app-pagina-registro',
  templateUrl: './pagina-registro.component.html',
  styleUrls: ['./pagina-registro.component.scss']
})

export class PaginaRegistroComponent implements OnInit {
  buscado: string;
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
  //Table
  displayedColumns: string[] = ['select', 'relator', 'tipoRelato', 'anomizado', 'time', 'relato'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selectionT = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selectionT.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selectionT.clear();
      return;
    }

    this.selectionT.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: PeriodicElement): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //   }
  //   return `${this.selectionT.isSelected(row) ? 'deselect' : 'select'} row ${row.relator + 1}`;
  // }

  onKeyUp(event: KeyboardEvent){
    const eventValue = (<HTMLInputElement>event.target).value;
    this.buscado = eventValue;
  }

  onSubmit(){
    if(this.buscado){
      console.log(this.buscado)
    }
  }

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
