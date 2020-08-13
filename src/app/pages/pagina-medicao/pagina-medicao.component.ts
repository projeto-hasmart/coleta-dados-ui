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
  data = Object.assign( ELEMENT_DATA);
  datum = Object.assign( ELEMENTS_DATA);
  error = false;
  direitoOK: boolean;
  esquerdoOK: boolean;
  displayedColumns: string[] = ['select',  'sistolica', 'diastolica'];
  dataSource = new MatTableDataSource<Afericao>(ELEMENT_DATA);
  dataSourced = new MatTableDataSource<Afericao>(ELEMENTS_DATA);
  selection = new SelectionModel<Afericao>(true, []);
  selections = new SelectionModel<Afericao>(true, []);
  errorBye = false;

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
    const index = this.dataSource.data.indexOf(row.id);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

  constructor(cz: CidadaoServiceService, mz: MedicaoServiceService, dz: DispensacaoServiceService, apiService: ApiService, router: Router) {
    this.cz = cz;
    this.mz = mz;
    this.dz = dz;
    this.apiService = apiService;
   }

//  updateCz(cidadaoEditado: Cidadao) {
//   this.apiService.updateCidadao(cidadaoEditado);
// }

ngOnInit() {
  if (this.cz.selecionadoId === undefined) {
    this.router.navigate(['/cidadaos']);
  } else {
  this.apiService.getCidadaoById(this.cz.selecionadoId).subscribe(cidadao => {
    ELEMENT_DATA = [];
    ELEMENTS_DATA = [];
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSourced = new MatTableDataSource(ELEMENTS_DATA);
    this.oNossoCidadao = cidadao as Cidadao;
    console.log(cidadao);
    console.log(this.oNossoCidadao);
  });
  this.cidadao$ = this.apiService.getCidadaoById(this.cz.selecionadoId);
}
}
goToView() {
  this.selecionaCidadao(this.oNossoCidadao.cpf, 'cpf');
}
selecionaCidadao(digitado: string, groupValue?: string) {
  if (groupValue === 'cpf') {
    this.cz.getAllCidadaos(digitado).subscribe(cidadao => {
      this.cz.cidadaos = cidadao as Cidadao[];
      this.cz.selecionadoId = cidadao[0].id;
      this.router.navigate(['/cidadaos/visualizar']);
    },
    err => {
      this.errorBye = true;
      console.log(err.error.errors.Cidadão[0]);
    });
  } else if (groupValue === 'rg') {
    this.cz.getCidadaos(digitado).subscribe(cidadao => {
      this.cz.cidadaos = cidadao as Cidadao[];
      this.cz.selecionadoId = cidadao[0].id;
      this.router.navigate(['/cidadaos/visualizar']);
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
removeSelectedRows() {

  this.selection.selected.forEach(item => {
    const index: number = this.data.findIndex(d => d === item);
    console.log(this.data.findIndex(d => d === item));
    this.data.splice(index, 1);
    this.dataSource = new MatTableDataSource<Afericao>(this.data);
  });
  this.selection = new SelectionModel<Afericao>(true, []);
}
removeSelectedMows() {

  this.selections.selected.forEach(item => {
    const index: number = this.datum.findIndex(d => d === item);
    console.log(this.datum.findIndex(d => d === item));
    this.datum.splice(index, 1);
    this.dataSourced = new MatTableDataSource<Afericao>(this.datum);
  });
  this.selections = new SelectionModel<Afericao>(true, []);
}
checkMedicao() {
  if (ELEMENT_DATA !== undefined && ELEMENTS_DATA !== undefined && this.peso > 30 && this.peso < 400) {
    for ( const data of ELEMENT_DATA ) {
      if ((data.sistolica > data.diastolica) && (data.diastolica > 1 && data.diastolica < 300)
      && (data.sistolica > 1 && data.sistolica < 300)) {
        this.direitoOK = true;
      } else {
        this.direitoOK = false;
      }
    }
    for ( const datum of ELEMENTS_DATA ) {
      if ((datum.sistolica > datum.diastolica) && (datum.diastolica > 1 && datum.diastolica < 300)
      && (datum.sistolica > 1 && datum.sistolica < 300)) {
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
novaMedicao() {
  for ( const data of ELEMENT_DATA) { // pode estar colocando 1 como valor da medicao
    this.finalData.push(data);
  }
  for ( const data of ELEMENTS_DATA) {
    this.finalData.push(data);
  }
  this.medido = {
    afericoes: this.finalData,
    peso:	this.peso
  };


  this.mz.createMedicao(this.medido, this.oNossoCidadao.id).subscribe();
  console.log(this.mz.createMedicao(this.medido, this.oNossoCidadao.id).subscribe());
}

}
