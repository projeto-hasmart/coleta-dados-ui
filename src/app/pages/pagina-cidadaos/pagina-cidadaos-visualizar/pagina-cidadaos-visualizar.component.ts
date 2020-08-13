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
let ELEMENT_DATA: any[] = [
];
let ELEMENTS_DATA: any[] = [
];
const MEDICAO: Medicao[] = [];

@Component({
  selector: 'app-pagina-cidadaos-visualizar',
  templateUrl: './pagina-cidadaos-visualizar.component.html',
  styleUrls: ['./pagina-cidadaos-visualizar.component.scss']
})
export class PaginaCidadaosVisualizarComponent implements OnInit {
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
  cidadaoEditado: CidadaoEdit;
  i = 0;
  weight;
  constructor(cz: CidadaoServiceService, mz: MedicaoServiceService, dz: DispensacaoServiceService, apiService: ApiService, router: Router) {
    this.cz = cz;
    this.mz = mz;
    this.dz = dz;
    this.apiService = apiService;
   }
  displayedColumns: string[] = ['data', 'servico', 'responsavel', 'info'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  dataSourceMedi = new MatTableDataSource<any>(ELEMENTS_DATA);
  selection = new SelectionModel<any>(true, []);
  /* declarando um nome pro property binding do nome dinâmico */

  color = 'green';
  diabetess: Diabetes[] = [
    {value: 1, viewValue: 'Não'},
    {value: 2, viewValue: 'Tipo 1'},
    {value: 3, viewValue: 'Tipo 2'},
    {value: 4, viewValue: 'Diabetes Gestante'}
  ];
  fumantes: Fumante[] = [
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
    console.log(dateComingFromServer);
    this.oNossoCidadao.dataNascimento = dateComingFromServer;
  }
  checkDate() {
    const dateSendingToServer = new DatePipe('en-US').transform(this.oNossoCidadao.dataNascimento, 'dd/MM/yyyy');
    console.log(dateSendingToServer);
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
    this.checkDate();
    this.cidadaoEditado = {
      dadosPessoais: {
        endereco: {
          rua: this.oNossoCidadao.dadosPessoais.endereco.rua,
          numero: this.oNossoCidadao.dadosPessoais.endereco.numero,
          complemento: this.oNossoCidadao.dadosPessoais.endereco.complemento,
          cidade: this.oNossoCidadao.dadosPessoais.endereco.cidade,
          estado: this.oNossoCidadao.dadosPessoais.endereco.estado
        },
        email: this.oNossoCidadao.dadosPessoais.email,
        telefone: this.oNossoCidadao.dadosPessoais.telefone,
        genero: this.oNossoCidadao.dadosPessoais.genero
      },
      indicadorRiscoHAS: {
        altura: this.oNossoCidadao.indicadorRiscoHAS.altura,
        diabetico: this.oNossoCidadao.indicadorRiscoHAS.diabetico,
        fumante: this.oNossoCidadao.indicadorRiscoHAS.fumante,
        antiHipertensivos: this.oNossoCidadao.indicadorRiscoHAS.antiHipertensivos,
        historicoAvc: this.oNossoCidadao.indicadorRiscoHAS.historicoAvc
      }
    };
    this.apiService.updateCidadao(this.cidadaoEditado, this.oNossoCidadao.id).subscribe();
  }

  ngOnInit() {
    if (this.cz.selecionadoId === undefined) {
      this.router.navigate(['/cidadaos']);
    } else {
      ELEMENT_DATA = [];
      localStorage.setItem('citizen', this.cz.selecionadoId.toString());
      if ((localStorage.getItem('citizen')) !== undefined) {
      this.apiService.getCidadaoById(this.cz.selecionadoId).subscribe(cidadao => {
      this.oNossoCidadao = cidadao as Cidadao;
      this.cidadao$ = this.apiService.getCidadaoById(this.cz.selecionadoId);
      this.getMedicoes();
      this.genero = this.oNossoCidadao.dadosPessoais.genero;
      this.verCpf();
    });
  }
      this.cidadao$ = this.apiService.getCidadaoById(this.cz.selecionadoId);
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
  for (const med of this.oNossoCidadao.medicoes) {
    ELEMENT_DATA.push(med);
  }
  // for (const disp of this.oNossoCidadao.dispensacoes) {
  //   ELEMENT_DATA.push(disp);
  // }

  ELEMENT_DATA.sort((a, b) => {
    return (new Date(b.dataHora.split('/').reverse().join('-')) as any) - (new Date(a.dataHora.split('/').reverse().join('-')) as any);
  });
  this.dataSource = new MatTableDataSource<any>(ELEMENT_DATA);

}
goToView() {
  this.mz.selecionaCidadao(this.oNossoCidadao.cpf);
}
// searchToView() {
//   this.cz.selecionaCidadao(this.buscado);

// }
medicaoDe(dataHora: string) {
  for (const med of ELEMENT_DATA) {
    if (med.dataHora === dataHora) {
      ELEMENTS_DATA = [];
      this.ultimaMedicao = dataHora;
      this.responsavel = med.estabelecimentoId;
      this.weight = med.peso;
      for (const af of med.afericoes) {
        ELEMENTS_DATA.push(af);
        this.dataSourceMedi = new MatTableDataSource(ELEMENTS_DATA);

      }
    }
  }
}
}
