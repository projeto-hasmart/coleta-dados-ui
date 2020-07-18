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


const ELEMENT_DATA: Afericao[] = [];
const ELEMENTS_DATA: Afericao[] = [];

@Component({
  selector: 'app-pagina-medicao',
  templateUrl: './pagina-medicao.component.html',
  styleUrls: ['./pagina-medicao.component.scss']
})
export class PaginaMedicaoComponent implements OnInit {
  oNossoCidadao: Cidadao;
  apiService: ApiService;
  finalData: Afericao[] = [];
  cz: CidadaoServiceService;
  mz: MedicaoServiceService;
  dz: DispensacaoServiceService;
  cidadao$: Observable<Cidadao>;
  novaAfericao: Afericao;
  medido: Medicao;
  router: Router;
  peso: number;
  displayedColumns: string[] = ['select',  'sistolica', 'diastolica'];
  dataSource = new MatTableDataSource<Afericao>(ELEMENT_DATA);
  dataSourced = new MatTableDataSource<Afericao>(ELEMENTS_DATA);
  selection = new SelectionModel<Afericao>(true, []);
  selections = new SelectionModel<Afericao>(true, []);


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

 updateCz(cidadaoEditado: Cidadao) {
  this.apiService.updateCidadao(cidadaoEditado);
}

ngOnInit() {
  if (this.cz.selecionadoId === undefined) {
    this.router.navigate(['/cidadaos']);
  } else {
  this.apiService.getCidadaoById(this.cz.selecionadoId).subscribe(cidadao => {
    this.oNossoCidadao = cidadao as Cidadao;
    console.log(cidadao);
    console.log(this.oNossoCidadao);
  });
  this.cidadao$ = this.apiService.getCidadaoById(this.cz.selecionadoId);
}
}
goToView() {
this.cz.selecionaCidadao(this.oNossoCidadao.cpf);
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
