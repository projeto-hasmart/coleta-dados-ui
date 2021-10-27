import { CidadaoServiceService } from './../../services/cidadao/cidadao-service.service';
import { RelatorioOpiniao } from './../../models/relatorioOpiniao';
import { RelatoService } from './../../services/relato/relato.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Cidadao } from 'src/app/models/cidadao';
import { ApiService } from 'src/app/services/api.service';
import { MedicaoServiceService } from 'src/app/services/medicao/medicao-service.service';

export interface PeriodicElement {
  relator: string;
  tipoRelato: string;
  anomizado: string;
  time: Date;
  relato: boolean;
}

let ELEMENT_DATA: RelatorioOpiniao[] = [
];

@Component({
  selector: 'app-relato',
  templateUrl: './relato.component.html',
  styleUrls: ['./relato.component.scss']
})
export class RelatoComponent implements OnInit {

  constructor(private cz: CidadaoServiceService, private mz: MedicaoServiceService, private apiService: ApiService,
              private router: Router, private rz: RelatoService) {
   }
  buscadoNome: string;
  checked = false;
  disabled = false;
  isCollapsed = true;
  valid = false;
  errorBye = false;
  relatorio: string;
  dataRelatorio: string;
  relator: string;
  tipoContato;
  anonimoNome;
  displayedColumns: string[] = ['select', 'tipoContato', 'anomizado', 'time', 'relato'];
  dataSource = new MatTableDataSource<RelatorioOpiniao>(ELEMENT_DATA);
  selectionT = new SelectionModel<RelatorioOpiniao>(true, []);
  relatos: RelatorioOpiniao[];
  cidadaos: Cidadao[];
  selection = new SelectionModel<any>(true, []);
  contatos: string[] = [
    'WhatsApp',
    'Ligação',
    'SMS',
    'Presencial',
    'E-mail',
    'Martha'
  ];
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

  // onKeyUp(event: KeyboardEvent) {
  //   const eventValue = (event.target as HTMLInputElement).value;
  //   this.buscado = eventValue;
  // }
  ngOnInit() {}
  // onSubmit() {
  //   if (this.buscado) {
  //     console.log(this.buscado);
  //   }
  // }

selecionaCidadao(digitado: string, groupValue?: string) {

  this.cz.getCidadaoByNomeAnonimo(digitado).subscribe(cid => {
    this.cidadaos = cid as Cidadao[];
    for (const c of this.cidadaos) {
      this.rz.getRelatosParaCidadao(c.id).subscribe(rel => {
        this.relatos = rel as RelatorioOpiniao[];
        for (const r of this.relatos) {
          r.nomeAnonimizado = c.anonimoNome;
        }
        this.getRelatos();
      }, err => {
        if (err.error.status === 404) {
          this.errorBye = true;
        }
      });
    }
  });

}

async CadastraRelatorio() {
  const r: RelatorioOpiniao = {
    relatorioCidadao: this.relatorio
  };
  this.rz.createRelato(this.cz.selecionadoId, r).subscribe(
    res => {
      this.valid = true;
    },
    err => {
      this.errorBye = true;
      this.valid = false;
    });
}
getRelatos() {
  ELEMENT_DATA = [];
  for (const r of this.relatos) {
    ELEMENT_DATA.push(r);
  }
  this.dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
}
relatorioDe(id: string) {
  for (const rel of ELEMENT_DATA) {
    if (rel.id === id) {
      this.relatorio = rel.relatorioCidadao;
      this.dataRelatorio = rel.dataRelatorio;
      this.relator = rel.relatorNome;
      switch (rel.tipoContato) {
        case 1: {
          this.tipoContato = 'WhatsApp';
          break;
        }
        case 2: {
          this.tipoContato = 'Ligação';
          break;
        }
        case 3: {
          this.tipoContato = 'SMS';
          break;
        }
        case 4: {
          this.tipoContato = 'Presencial';
          break;
        }
        case 5: {
          this.tipoContato = 'E-mail';
          break;
        }
        case 6: {
          this.tipoContato = 'Martha';
          break;
        }
        default: {
          this.tipoContato = 'Martha';
          break;
        }
      }
      this.tipoContato = rel.tipoContato;
      this.anonimoNome = rel.nomeAnonimizado;
    }
  }
}
}
