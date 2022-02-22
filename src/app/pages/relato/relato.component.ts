import { RelatorioOpiniaoPP } from 'src/app/models/relatorioOpiniaoPostPut';
import { CidadaoServiceService } from './../../services/cidadao/cidadao-service.service';
import { RelatorioOpiniao } from './../../models/relatorioOpiniao';
import { RelatoService } from './../../services/relato/relato.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Cidadao } from 'src/app/models/cidadao';
import { ApiService } from 'src/app/services/api.service';
import { MedicaoServiceService } from 'src/app/services/medicao/medicao-service.service';
import { DatePipe } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';
import * as moment from 'moment';

let ELEMENT_DATA: RelatorioOpiniao[] = [
];

@Component({
  selector: 'app-relato',
  templateUrl: './relato.component.html',
  styleUrls: ['./relato.component.scss']
})
export class RelatoComponent implements OnInit{
// tslint:disable-next-line: no-output-native
@Output() close = new EventEmitter<boolean>();
@ViewChild('closeModalBtn', {static: false}) closeModalBtn: ElementRef;
  date: Date;

  constructor(private cz: CidadaoServiceService, private mz: MedicaoServiceService, private apiService: ApiService,
    private router: Router,
    private rz: RelatoService,
    private datePipe: DatePipe,
    private deviceService: DeviceDetectorService) {
      //this.definirRelatorios();
      // if(localStorage.getItem('value') == 'ok'){
      //   this.definirRelatorios();
      // } else {this.definirRelatorios();}

      this.epicFunction();
   }
  buscadoNome: string;
  editing = false;
  checked = false;
  disabled = false;
  isCollapsed = true;
  success = false;
  valid = false;
  errorBye = false;
  dateIssue = false;
  notFound = false;
  relatorio: string;
  dataRelatorio: string;
  relator: string;
  tipoContato;
  anonimoNome;
  cpf;
  cidId;
  relatoAtual: RelatorioOpiniao;
  relatoAtualizadoCriado: RelatorioOpiniaoPP;
  displayedColumns: string[] = ['select', 'tipoContato', 'relator', 'anomizado', 'time', 'relato'];
  dataSource = new MatTableDataSource<RelatorioOpiniao>(ELEMENT_DATA);
  relatos: RelatorioOpiniao[];
  cidadaos: Cidadao[];
  selection = new SelectionModel<RelatorioOpiniao>(true, []);
  contatos: string[] = [
    'WhatsApp',
    'Ligação',
    'SMS',
    'Presencial',
    'E-mail',
    'Martha',
    'Outros'
  ];
  isMobile;
  deviceInfo = null;
  innerWidth;
  innerHeight;
  valores = [];
  valoresR = [...ELEMENT_DATA];
  labelChange = true;
  hour:string;
  cidadao$: Observable<RelatorioOpiniao>;

  onlabelChange(){
    this.labelChange = false;
  }
  onlabelChange2(){
    this.labelChange = true;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerWidth = window.innerWidth;
  this.innerHeight = window.innerHeight;
}
  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    this.isMobile = isMobile;
    const isDesktopDevice = this.deviceService.isDesktop();
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
  checkboxLabel(row?: RelatorioOpiniao): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
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
  ngOnInit() {
    localStorage.removeItem('changePag');
    localStorage.setItem('value','ok');
    if(localStorage.getItem('value') == 'ok'){
      this.definirRelatorios();
    } else {this.definirRelatorios();}
    if (localStorage.getItem('buscado') !== null && localStorage.getItem('buscado') !== undefined &&
        localStorage.getItem('buscado') !== ''  ) {
      this.selecionaCidadao(localStorage.getItem('buscado'));
    }
    this.relatoAtual = {
      relatorioCidadao: '',
      tipoContato: 0
    };
  }
  // onSubmit() {
  //   if (this.buscado) {
  //     console.log(this.buscado);
  //   }
  // }

selecionaCidadao(digitado: string, groupValue?: string) {
  if (localStorage.getItem('buscado') !== null && localStorage.getItem('buscado') !== undefined &&
  localStorage.getItem('buscado') !== ''  ) {
    localStorage.removeItem('buscado');
  }
  this.relatos = [];
  this.rz.getRelatosParaCidadaosAnonimos(digitado).subscribe(cid => {
    for (const c of cid) {
      c.nomeAnonimizado = c.cidadao.anonimoNome;
      this.relatos.push(c);
    }
    this.getRelatos();
  });
}
getRelatos() {
  ELEMENT_DATA = [];
  for (const r of this.relatos) {
    ELEMENT_DATA.push(r);
  }
  ELEMENT_DATA.sort((a, b) => {
    return (new Date(b.dataRelatorio.split('/').reverse().join('-')) as any) -
            (new Date(a.dataRelatorio.split('/').reverse().join('-')) as any);
  });
  this.dataSource = new MatTableDataSource<RelatorioOpiniao>(ELEMENT_DATA);
}

definirRelatorios(){
    ELEMENT_DATA = [];
    this.rz.getAllRelatosParaCidadao().subscribe(all => {
      for (const x of all){
        ELEMENT_DATA.push(x);
      }
    });
  }

closedModal() {
  this.relator = '';
  this.dataRelatorio = '';
  this.anonimoNome = '';
  this.tipoContato = '';
  this.relatorio = '';
  this.selection.clear();
}

deleteSelected() {
  this.selection.selected.forEach(item => {
    this.rz.deleteRelatoParaCidadao(item.cidadaoId, item.id).subscribe(_ => {
      const index: number = this.dataSource.data.indexOf(item);
      this.dataSource.data.splice(index, 1);
      this.dataSource = new MatTableDataSource<RelatorioOpiniao>(this.dataSource.data);
    });
  });
  this.selection = new SelectionModel<RelatorioOpiniao>(true, []);
}

cadastraOuAtualizaRelato() {
  switch (this.tipoContato) {
    case 'WhatsApp': {
      this.relatoAtual.tipoContato = 1;
      break;
    }
    case 'Ligação': {
      this.relatoAtual.tipoContato = 2;
      break;
    }
    case 'SMS': {
      this.relatoAtual.tipoContato = 3;
      break;
    }
    case 'Presencial': {
      this.relatoAtual.tipoContato = 4;
      break;
    }
    case 'E-mail': {
      this.relatoAtual.tipoContato = 5;
      break;
    }
    case 'Martha': {
      this.relatoAtual.tipoContato = 6;
      break;
    }
    case 'Outro': {
      this.relatoAtual.tipoContato = 7;
    }
    default: {
      this.relatoAtual.tipoContato = 0;
      break;
    }
  }

    if(this.dataRelatorio !== undefined){
      this.relatoAtual.dataRelatorio = this.datePipe.transform(this.dataRelatorio, 'yyyy-MM-dd h:mm:ssZZZZZ');
    }
    else{
    this.valid = false;
    this.errorBye = true;
    this.checked = true;
    this.dateIssue = true;
    }

  if (this.relatoAtual.id !== undefined && this.relatoAtual.id  !== '' && this.relatoAtual.id  !== null) {
    this.relatoAtualizadoCriado =  {
      relatorioCidadao: this.relatorio,
      relatorNome: this.relator,
      dataRelatorio: this.relatoAtual.dataRelatorio,
      tipoContato: this.relatoAtual.tipoContato,
      success: this.success
    };
    // tslint:disable-next-line: max-line-length
    this.rz.updateRelatoParaCidadao(this.relatoAtual.cidadaoId, this.relatoAtual.id, this.relatoAtualizadoCriado).subscribe(_ => {
      this.valid = true;
      this.errorBye = false;
      localStorage.setItem('buscado', this.buscadoNome);
      setTimeout(() => {
    }, 1000);
      this.closeModalBtn.nativeElement.click();
      window.location.reload();
    },
    err => {
      this.errorBye = true;
      this.valid = false;
    });
  } else {
    this.relatoAtualizadoCriado =  {
      relatorioCidadao: this.relatorio,
      relatorNome: this.relator,
      dataRelatorio: this.relatoAtual.dataRelatorio,
      tipoContato: this.relatoAtual.tipoContato,
      success: this.success
    };
    this.cz.getAllCidadaos(this.cpf).subscribe(res => {
      this.valid = true;
      this.cidId = res[0].id;
      this.rz.createRelato(this.cidId, this.relatoAtualizadoCriado).subscribe(_ => {
      this.valid = true;
      this.errorBye = false;
      localStorage.setItem('buscado', this.buscadoNome);
      setTimeout(() => {
    }, 1000);
      this.closeModalBtn.nativeElement.click();
      window.location.reload();
    },
    err => {
      this.checked = true;
      this.errorBye = true;
      this.valid = false;
    });
    }, err => {
      this.checked = true;
      this.errorBye = true;
      this.valid = false;
    });
  }
}

relatorioDe(id: string) {
      if (id === '' || id === undefined || id === null) {
        this.selection.clear();
        this.editing = false;
        this.relatorio = '';
        this.cpf = '';
        this.dataRelatorio = '';
        this.tipoContato = '';
        this.hour = '';
        this.success = false;
      }
      else {
        for (const rel of ELEMENT_DATA) {
        if (rel.id === id) {
        this.editing = true;
        this.relatoAtual = rel;
        this.date = new Date(this.dataRelatorio);
        let timeZoneOffset = moment(this.dataRelatorio).format('Z');
        let localTime = moment.utc(this.dataRelatorio).utcOffset(timeZoneOffset).format("LLLL");
        localTime = rel.dataRelatorio;
        this.relatorio = rel.relatorioCidadao;
        this.success = rel.success;
        this.relator = rel.relatorNome;
        this.hour = rel.horaRelatorio;
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
          case 7: {
            this.tipoContato = 'Outro';
            break;
          }
          case 0: {
            this.tipoContato = 'Martha';
            break;
          }
        }
        this.anonimoNome = rel.nomeAnonimizado;
      }
    }
    }

  }
}
