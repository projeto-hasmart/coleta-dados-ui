import { RelatorioOpiniao } from './../../../models/relatorioOpiniao';
import { MedicaoServiceService } from './../../../services/medicao/medicao-service.service';
import { Observable } from 'rxjs';
import { ApiService } from './../../../services/api.service';
import { Cidadao } from './../../../models/cidadao';
import { CidadaoServiceService } from './../../../services/cidadao/cidadao-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DispensacaoServiceService } from 'src/app/services/dispensacao/dispensacao-service.service';
import { Medicao } from 'src/app/models/medicao';
import { DatePipe } from '@angular/common';
import { CidadaoEdit } from 'src/app/models/cidadaoEdit';


interface Diabetes {
  value: number;
  viewValue: string;
}
interface Fumante {
  value: number;
  viewValue: string;
}
let ELEMENT_DATA: Medicao[] = [
];
let ELEMENTS_DATA: any[] = [
];
let ELEMENTZ_DATA: RelatorioOpiniao[] = [];

const MEDICAO: Medicao[] = [];

@Component({
  selector: 'app-pagina-cidadaos-visualizar',
  templateUrl: './pagina-cidadaos-visualizar.component.html',
  styleUrls: ['./pagina-cidadaos-visualizar.component.scss']
})
export class PaginaCidadaosVisualizarComponent implements OnInit, AfterViewInit {
  checked = false;
  disabled = false;
  dispensacao = 1234567;
  isCollapsed = true;
  oNossoCidadao: Cidadao;
  apiService: ApiService;
  cz: CidadaoServiceService;
  mz: MedicaoServiceService;
  dz: DispensacaoServiceService;
  cidadao$: Observable<Cidadao>;
  ultimaMedicao: string;
  responsavel: string;
  router: Router;
  buscado: string;
  showingCpf: string;
  showingCep: string;
  showingPhone: string;
  cidadaoEditado: CidadaoEdit;
  i = 0;
  j: number;
  sendingCpf: string;
  weight;
  relatorioCidadao: string;
  constructor(cz: CidadaoServiceService, mz: MedicaoServiceService, dz: DispensacaoServiceService, apiService: ApiService, router: Router) {
    this.cz = cz;
    this.mz = mz;
    this.dz = dz;
    this.apiService = apiService;
    this.router = router;
   }
  displayedColumns: string[] = ['dataHora', 'servico', 'responsavel', 'info'];
  displayedColumnsAfer: string[] = ['sistolica', 'diastolica'];
  displayedColumnsRel: string[] = ['dataRelatorio', 'servico', 'info'];

  dataSource;
  dataSourceMedi;
  dataSourceRel;
  selection = new SelectionModel<any>(true, []);
  /* declarando um nome pro property binding do nome dinâmico */

  color = 'green';
  diabetess: Diabetes[] = [
    {value: 0, viewValue: 'Não informado'},
    {value: 1, viewValue: 'Não'},
    {value: 2, viewValue: 'Tipo 1'},
    {value: 3, viewValue: 'Tipo 2'},
    {value: 4, viewValue: 'Diabetes Gestante'}
  ];
  fumantes: Fumante[] = [
    {value: 0, viewValue: 'Não informado'},
    {value: 1, viewValue: 'Não fumante'},
    {value: 2, viewValue: 'Fumante'},
    {value: 3, viewValue: 'Ex-Fumante'}
  ];
  genero: string;
  generos: string[] = [
    'Masculino',
    'Feminino',
    'Outro',
    'Prefere não dizer'
  ];
  gotDate() {
    const dateComingFromServer = new DatePipe('dd/MM/yyyy').transform(this.oNossoCidadao.dataNascimento, 'mm-dd-yyyy');
    this.oNossoCidadao.dataNascimento = dateComingFromServer;
  }
  checkDate() {
    const dateSendingToServer = new DatePipe('en-US').transform(this.oNossoCidadao.dataNascimento, 'dd/MM/yyyy');
    this.oNossoCidadao.dataNascimento = dateSendingToServer;
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  updateCz() {
    this.cidadaoEditado = {
      dadosPessoais: {
        endereco: {
          rua: this.oNossoCidadao.dadosPessoais.endereco.rua,
          numero: this.oNossoCidadao.dadosPessoais.endereco.numero,
          complemento: this.oNossoCidadao.dadosPessoais.endereco.complemento,
          cidade: this.oNossoCidadao.dadosPessoais.endereco.cidade,
          estado: this.oNossoCidadao.dadosPessoais.endereco.estado,
          cep: this.oNossoCidadao.dadosPessoais.endereco.cep
        },
        email: this.oNossoCidadao.dadosPessoais.email,
        telefone: this.oNossoCidadao.dadosPessoais.telefone,
        genero: this.oNossoCidadao.dadosPessoais.genero
      },
      indicadorRiscoHAS: {
        altura: this.oNossoCidadao.indicadorRiscoHAS.altura,
        diabetico: this.oNossoCidadao.indicadorRiscoHAS.diabetico,
        fumante: this.oNossoCidadao.indicadorRiscoHAS.fumante,
        historicoAvc: this.oNossoCidadao.indicadorRiscoHAS.historicoAvc,
        doencaRenalCronica: this.oNossoCidadao.indicadorRiscoHAS.doencaRenalCronica,
        insuficienciaCardiaca: this.oNossoCidadao.indicadorRiscoHAS.insuficienciaCardiaca,
        historicoInfarto: this.oNossoCidadao.indicadorRiscoHAS.historicoInfarto,
        doencaArterialObstrutivaPeriferica: this.oNossoCidadao.indicadorRiscoHAS.doencaArterialObstrutivaPeriferica,
        retinopatiaHipertensiva: this.oNossoCidadao.indicadorRiscoHAS.retinopatiaHipertensiva
      }
    };
    this.apiService.updateCidadao(this.cidadaoEditado, this.oNossoCidadao.id).subscribe();
    this.verCep();
    setTimeout(() => {
   }, 500);
    window.location.reload();
  }

  ngOnInit() {
    if (this.cz.selecionadoId === undefined) {
      this.router.navigate(['/cidadaos']);
    } else {
      ELEMENT_DATA = [];
      ELEMENTZ_DATA = [];
      localStorage.setItem('citizen', this.cz.selecionadoId.toString());
      if ((localStorage.getItem('citizen')) !== undefined) {
      this.apiService.getCidadaoById(this.cz.selecionadoId).subscribe(cidadao => {
      this.oNossoCidadao = cidadao as Cidadao;
      this.cidadao$ = this.apiService.getCidadaoById(this.cz.selecionadoId);
      this.getMedicoes();
      this.genero = this.oNossoCidadao.dadosPessoais.genero;
      this.verCpf();
      this.verCep();
      this.verTelefone();
    });
  }
      this.cidadao$ = this.apiService.getCidadaoById(this.cz.selecionadoId);
  }
}
ngAfterViewInit() {
  this.dataSource = new MatTableDataSource<Medicao>(ELEMENT_DATA);
  this.dataSourceMedi = new MatTableDataSource<any>(ELEMENTS_DATA);
  this.dataSourceRel = new MatTableDataSource<RelatorioOpiniao>(ELEMENTZ_DATA);
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
getMedicoes() {
  ELEMENT_DATA = [];
  ELEMENTZ_DATA = [];
  for (const med of this.oNossoCidadao.medicoes) {
    ELEMENT_DATA.push(med);
  }
  for (const rel of this.oNossoCidadao.relatorios) {
    ELEMENTZ_DATA.push(rel);
  }

  ELEMENT_DATA.sort((a, b) => {
    return (new Date(b.dataHora.split('/').reverse().join('-')) as any) - (new Date(a.dataHora.split('/').reverse().join('-')) as any);
  });

  ELEMENTZ_DATA.sort((a, b) => {
    return (new Date(b.dataRelatorio.split('/').reverse().join('-')) as any) -
      (new Date(a.dataRelatorio.split('/').reverse().join('-')) as any);
  });

  this.dataSource = new MatTableDataSource<Medicao>(ELEMENT_DATA);
  this.dataSourceRel = new MatTableDataSource<RelatorioOpiniao>(ELEMENTZ_DATA);
}


goToView() {
  this.mz.selecionaCidadao(this.oNossoCidadao.cpf);
}
reportToView() {
  this.cz.getAllCidadaos(this.oNossoCidadao.cpf).subscribe(cidadao => {
    this.cz.cidadaos = cidadao as Cidadao[];
    this.cz.selecionadoId = cidadao[0].id;
    this.router.navigate(['/cidadaos/visualizar/' + this.cz.selecionadoId + '/relatorio']);
  });
}
// searchToView() {
//   this.cz.selecionaCidadao(this.buscado);

// }
medicaoDe(id: string) {
  for (const med of ELEMENT_DATA) {
    if (med.id === id) {
      ELEMENTS_DATA = [];
      this.ultimaMedicao = med.dataHora;
      this.responsavel = med.estabelecimentoId;
      this.weight = med.peso;
      for (const af of med.afericoes) {
        ELEMENTS_DATA.push(af);
        this.dataSourceMedi = new MatTableDataSource(ELEMENTS_DATA);
      }
    }
  }
}

relatorioDe(id: string) {
  for (const rel of ELEMENTZ_DATA) {
    if (rel.id === id) {
      this.relatorioCidadao = rel.relatorioCidadao;
      this.ultimaMedicao = rel.dataRelatorio;
    }
  }
}
}
