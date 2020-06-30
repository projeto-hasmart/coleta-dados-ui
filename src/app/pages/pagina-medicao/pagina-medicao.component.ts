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
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'}
];

@Component({
  selector: 'app-pagina-medicao',
  templateUrl: './pagina-medicao.component.html',
  styleUrls: ['./pagina-medicao.component.scss']
})
export class PaginaMedicaoComponent implements OnInit {
  nome = 'Mateus Palácio';
  cpf = '07183864127';
  data = '17/03/2020';
  rg = '20075719122';
  endereco = 'Rua Paulo Coelho, 175';
  complemento = 'Casa 32';
  cidade = 'Forte Grande';
  telefone = '(12) 3456-7890';
  dataNascimento = '30/02/1990';
  estado = 'Ceará';
  genero = 'Masculino';
  altura = '168 cm';
  antiHipertensivo = 'Não';
  diabetes = 'Não';
  avc = 'Não';
  fumante = 'Não';
  oNossoCidadao: Cidadao;
  apiService: ApiService;
  cz: CidadaoServiceService;
  mz: MedicaoServiceService;
  dz: DispensacaoServiceService;
  cidadao$: Observable<Cidadao>;
  router: Router;
  peso: number;
  displayedColumns: string[] = ['select',  'sistolica', 'diastolica'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSourced = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  selections = new SelectionModel<PeriodicElement>(true, []);


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  isAllSelecteds() {
    const numSelected = this.selections.selected.length;
    const numRows = this.dataSource.data.length;
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
        this.dataSource.data.forEach(row => this.selections.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  checkboxLabels(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelecteds() ? 'select' : 'deselect'} all`;
    }
    return `${this.selections.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  onKey(event: any) { // without type info
    this.peso += event.target.value;
  }

  excluirAfericao() {

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

}
