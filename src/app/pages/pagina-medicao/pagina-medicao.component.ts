import { Medicamento } from './../../models/medicamento';
import { Medicao } from './../../models/medicao';
import { Afericao } from './../../models/afericao';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Cidadao } from 'src/app/models/cidadao';
import { ApiService } from 'src/app/services/api.service';
import { CidadaoServiceService } from 'src/app/services/cidadao/cidadao-service.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MedicaoServiceService } from 'src/app/services/medicao/medicao-service.service';
import { DispensacaoServiceService } from 'src/app/services/dispensacao/dispensacao-service.service';
import { FormControl } from '@angular/forms';

interface Diabetes {
  value: number;
  viewValue: string;
}
interface Fumante {
  value: number;
  viewValue: string;
}
let ELEMENT_DATA: Afericao[] = [];
let ELEMENTS_DATA: Afericao[] = [];

@Component({
  selector: 'app-pagina-medicao',
  templateUrl: './pagina-medicao.component.html',
  styleUrls: ['./pagina-medicao.component.scss']
})
export class PaginaMedicaoComponent implements OnInit {
  oNossoCidadao: Cidadao;
  apiService: ApiService;
  finalData: Afericao[] = [];
  isCollapsed = true;
  cz: CidadaoServiceService;
  mz: MedicaoServiceService;
  dz: DispensacaoServiceService;
  cidadao$: Observable<Cidadao>;
  novaAfericao: Afericao;
  medido: Medicao;
  router: Router;
  peso: number;
  data = Object.assign(ELEMENT_DATA);
  datum = Object.assign(ELEMENTS_DATA);
  error = false;
  direitoOK: boolean;
  esquerdoOK: boolean;
  medicamento: Medicamento;
  medicamentos: Medicamento[] = [];
  sentMedicamentos: Medicamento[] = [];
  displayedColumns: string[] = ['select',  'sistolica', 'diastolica'];
  displayingColumns: string[] = ['nome', 'apresentacao', 'delete'];
  dataSource = new MatTableDataSource<Afericao>(ELEMENT_DATA);
  dataSourced = new MatTableDataSource<Afericao>(ELEMENTS_DATA);
  dataSourcem = new MatTableDataSource<Medicamento>(this.medicamentos);
  selection = new SelectionModel<Afericao>(true, []);
  selections = new SelectionModel<Afericao>(true, []);
  errorBye = false;
  showingCpf: string;
  showingCep: string;
  showingPhone: string;
  i = 0;
  public myControl: FormControl;
  filteredMedicine: Medicamento[] = [];
  availableMedicine: Medicamento[] = [
    {Nome: 'Anlodipino Besilato', apresentacao: 'Comprimido 5mg'},
    {Nome: 'Losartana Potássica', apresentacao: 'Comprimido 50mg'},
    {Nome: 'Atenolol', apresentacao: 'Comprimido 50mg'},
    {Nome: 'Carvedilol', apresentacao: 'Comprimidos 6,25mg'},
    {Nome: 'Carvedilol', apresentacao: 'Comprimidos 25mg'},
    {Nome: 'Propanolol Cloridato', apresentacao: 'Comprimido 40mg'},
    {Nome: 'Enalapril Maleato', apresentacao: 'Comprimido 20mg'},
    {Nome: 'Espironolactona', apresentacao: 'Comprimido 25mg'},
    {Nome: 'Furosemida', apresentacao: 'Comprimido 40mg'},
    {Nome: 'Hidroclorotiazida', apresentacao: 'Comprimido 25mg'},
    {Nome: 'Metildopa', apresentacao: 'Comprimido 250mg'},
    {Nome: 'Outros'}
  ];
  // filteredMedicine: Observable<Medicamento[]>;
  genero: string;
  generos: string[] = [
    'Masculino',
    'Feminino',
    'Outro',
    'Prefere não dizer'
  ];
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
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  isAllSelecteds() {
    const numSelected = this.selections.selected.length;
    const numRows = this.dataSourced.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  masterToggles() {
    this.isAllSelecteds() ?
        this.selections.clear() :
        this.dataSourced.data.forEach(row => this.selections.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Afericao): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  checkboxLabels(row?: Afericao): string {
    if (!row) {
      return `${this.isAllSelecteds() ? 'select' : 'deselect'} all`;
    }
    return `${this.selections.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  // onKey(event: any) { // without type info
  //   this.peso += event.target.value;
  // }

  excluirAfericao(row) {
    const index = this.dataSource.data.indexOf(row);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
  deleteThisMedicine(row) {
    const index = this.dataSourcem.data.indexOf(row);
    this.dataSourcem.data.splice(index, 1);
    this.dataSourcem._updateChangeSubscription();
  }
  constructor(cz: CidadaoServiceService, mz: MedicaoServiceService, dz: DispensacaoServiceService, apiService: ApiService,
              router: Router) {
    this.cz = cz;
    this.mz = mz;
    this.dz = dz;
    this.router = router;
    this.apiService = apiService;
    this.myControl = new FormControl();
    this.myControl.valueChanges.subscribe(newValue => {
      this.filteredMedicine = this.filterValues(newValue);
  });
   }

ngOnInit() {
  if (this.cz.selecionadoId === undefined) {
    this.router.navigate(['/inicio']);
  } else {
  this.apiService.getCidadaoById(this.cz.selecionadoId).subscribe(cidadao => {
    ELEMENT_DATA = [];
    ELEMENTS_DATA = [];
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSourced = new MatTableDataSource(ELEMENTS_DATA);
    this.oNossoCidadao = cidadao as Cidadao;
    this.genero = this.oNossoCidadao.dadosPessoais.genero;
    this.verCpf();
    this.verCep();
    this.verTelefone();
  });
  this.cidadao$ = this.apiService.getCidadaoById(this.cz.selecionadoId);
}
}
filterValues(search: string) {
  return this.availableMedicine.filter( value =>
  value.Nome.toLowerCase().indexOf(search.toLowerCase()) === 0);
}
goToView() {
  this.selecionaCidadao(this.oNossoCidadao.cpf, 'cpf');
}
goBackToView() {
  this.selecionaCidadao(this.oNossoCidadao.cpf, 'back');
}
selecionaCidadao(digitado: string, groupValue?: string) {
  if (groupValue === 'cpf') {
    this.cz.getAllCidadaos(digitado).subscribe(cidadao => {
      this.cz.cidadaos = cidadao as Cidadao[];
      this.cz.selecionadoId = cidadao[0].id;
      this.router.navigate(['/medicao/' + this.cz.selecionadoId + '/sucesso']);
    },
    err => {
      this.errorBye = true;
      console.log(err.error.errors.Cidadão[0]);
    });
  } else if (groupValue === 'rg') {
    this.cz.getCidadaos(digitado).subscribe(cidadao => {
      this.cz.cidadaos = cidadao as Cidadao[];
      this.cz.selecionadoId = cidadao[0].id;
      this.router.navigate(['/medicao/' + this.cz.selecionadoId + '/sucesso']);
    }, err => {
      this.errorBye = true;
      console.log(err.error.errors.Cidadão[0]);
    });
  } else if (groupValue === 'back') {
    this.cz.getCidadaos(digitado).subscribe(cidadao => {
      this.cz.cidadaos = cidadao as Cidadao[];
      this.cz.selecionadoId = cidadao[0].id;
      this.router.navigate(['/cidadao/visualizar/' + this.cz.selecionadoId]);

    }, err => {
      this.errorBye = true;
      console.log(err.error.errors.Cidadão[0]);
    });
  }


}
addRow() {
  this.novaAfericao = {
  };
  ELEMENT_DATA.push(this.novaAfericao);
  this.dataSource = new MatTableDataSource(ELEMENT_DATA);
}
addRowd() {
  this.novaAfericao = {
  };
  ELEMENTS_DATA.push(this.novaAfericao);
  this.dataSourced = new MatTableDataSource(ELEMENTS_DATA);
}
addRowm() {
  this.medicamento = {

  };
  this.medicamentos.push(this.medicamento);
  this.dataSourcem = new MatTableDataSource(this.sentMedicamentos);
}
removeSelectedRows() {
  this.selection.selected.forEach(item => {
    const index: number = this.dataSource.data.indexOf(item);
    this.dataSource.data.splice(index, 1);
    this.dataSource = new MatTableDataSource<Afericao>(this.dataSource.data);
  });
  this.selection = new SelectionModel<Afericao>(true, []);
}
removeSelectedMows() {

  this.selections.selected.forEach(item => {
    const index: number = this.dataSourced.data.indexOf(item);
    this.dataSourced.data.splice(index, 1);
    this.dataSourced = new MatTableDataSource<Afericao>(this.dataSourced.data);
  });
  this.selections = new SelectionModel<Afericao>(true, []);
}
checkMedicao() {
  if (ELEMENT_DATA !== undefined && ELEMENTS_DATA !== undefined && this.peso > 30 && this.peso < 400) {
    for ( const data of ELEMENT_DATA ) {
      if ((data.sistolica > data.diastolica) && (data.diastolica > 1 && data.diastolica < 300)
      && (data.sistolica > 1 && data.sistolica < 300) && (data.sistolica > 0 && data.diastolica > 0)) {
        this.direitoOK = true;
      } else {
        this.direitoOK = false;
      }
    }
    for ( const datum of ELEMENTS_DATA ) {
      if ((datum.sistolica > datum.diastolica) && (datum.diastolica > 1 && datum.diastolica < 300)
      && (datum.sistolica > 1 && datum.sistolica < 300) && (datum.sistolica > 0 && datum.diastolica > 0)) {
        this.esquerdoOK = true;
      } else {
        this.esquerdoOK = false;
      }
    }
    if ( this.direitoOK === true && this.esquerdoOK === true) {
      this.novaMedicao();
    } else {
      this.error = true;
    }
  } else {
    this.error = true;
  }
}
verTelefone() {
  if (this.oNossoCidadao.dadosPessoais.telefone.includes('(') && this.oNossoCidadao.dadosPessoais.telefone.includes(')') ) {
    this.showingPhone = this.oNossoCidadao.dadosPessoais.telefone;
  } else {
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
addMedicine(nomee: string) {
  this.medicamento = {
    Nome: nomee
  };
  this.sentMedicamentos.push(this.medicamento);
}
novaMedicao() {
  for ( const data of ELEMENT_DATA) {
    this.finalData.push(data);
  }
  for ( const data of ELEMENTS_DATA) {
    this.finalData.push(data);
  }
  this.medido = {
    afericoes: this.finalData,
    peso:	this.peso,
    medicamentos: this.sentMedicamentos
  };

  this.mz.createMedicao(this.medido, this.oNossoCidadao.id).subscribe();
  this.goToView();
}
}
