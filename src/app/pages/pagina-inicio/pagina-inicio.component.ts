import { CsvFile } from './../../models/csvFile';
import { Medico } from 'src/app/models/medico';
import { User } from './../../models/user';
import { CidadaoServiceService } from './../../services/cidadao/cidadao-service.service';
import { Cidadao } from './../../models/cidadao';
import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { Global } from 'src/app/models/globalConstants';
import { NavigationEnd, Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Location } from '@angular/common';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-dash-board',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.scss']
})

// tslint:disable-next-line: component-class-suffix
export class PaginaInicio implements OnInit {
  hideModal:string;
  optinAccept:string;
  isMobile;
  deviceInfo = null;
  innerWidth;
  innerHeight;
  clicked = false;
  cidadaos: Cidadao[];
  apiService: ApiService;
  buscado: string;
  cidadaos$: Observable<any[]>;
  cidadaoService: CidadaoServiceService;
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  totalMedicoes: number;
  idk: Global;
  errorBye = false;
  router: Router;
  mask: string;
  user: Medico;
  uploading = false;
  uploadCompleted = false;
  countOfUploaded = 0;
  uploadError;
  searchError;
  ativo = true;
  getCidadao = 0;
  cidadao$: Observable<Cidadao[]>;

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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  constructor(apiService: ApiService, cidadaoService: CidadaoServiceService, idk: Global, router: Router, private deviceService: DeviceDetectorService, private location: Location) {
    this.apiService = apiService;
    this.cidadaoService = cidadaoService;
    this.idk = idk;
    this.router = router;
    this.epicFunction();
    this.optinAccept = localStorage.getItem('accept');
  }

  ngOnInit() {
    localStorage.removeItem('changePag');
    this.hideModal = localStorage.getItem('accept');
    this.apiService.getCidadaos().subscribe(
      res => {
        this.getCidadao = res.length
      }
    )
    this.cidadao$ = this.apiService.getCidadaos();
    this.user = JSON.parse(localStorage.getItem('currentUser')) as Medico;
    if(this.user == null){
      this.router.navigate(['/']);
    }
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

  noClick(){
    this.clicked = true;
  }

  onAccept(key: string, value: any){
    localStorage.setItem(key, value);
    return this.hideModal = 'sim';
  }

  formatinput(){
    this.mask = '00000000000'
  }

  checkIt(groupValue: string) {
    if (groupValue === 'cpf') {
      this.mask = '000.000.000-00';
    } else {
      this.mask = '00000000000';
    }
  }

  searchCidadao(){
    this.cidadaoService.getAllCidadaos(this.buscado).subscribe(cidadao => {
      this.cidadaoService.cidadaos = cidadao as Cidadao[];
      this.cidadaoService.selecionadoId = cidadao[0].id;
      this.router.navigate(['/cidadaos/visualizar/' + cidadao[0].id]);
    })
    this.cidadaoService.getCidadaoByNome(this.buscado).subscribe(cidadao => {
      this.cidadaoService.cidadaos = cidadao as Cidadao[];
      this.cidadaos = cidadao as Cidadao[];
      this.cidadaoService.selecionadoId = cidadao[0].id;
      this.router.navigate(['/cidadaos/visualizar/' + cidadao[0].id]);
  })
}

  goToView(groupValue: string) {
    this.selecionaCidadao(this.buscado, groupValue);
  }
  selecionaCidadao(digitado: string, groupValue?: string) {
    if (groupValue === 'cpf') {
      this.cidadaoService.getAllCidadaos(this.buscado).subscribe(cidadao => {
        this.cidadaoService.cidadaos = cidadao as Cidadao[];
        this.cidadaoService.selecionadoId = cidadao[0].id;
        this.router.navigate(['/cidadaos/visualizar/' + cidadao[0].id]);
      },
      err => {
        if (err.error.status === 404) {
          this.errorBye = true;
          this.searchError = 'Cidadão não encontrado!';
        }
      });
    } else if (groupValue === 'rg') {
      this.cidadaoService.getCidadaos(digitado).subscribe(cidadao => {
        this.cidadaoService.cidadaos = cidadao as Cidadao[];
        this.cidadaoService.selecionadoId = cidadao[0].id;
        this.router.navigate(['/cidadaos/visualizar/' + cidadao[0].id]);
      }, err => {
        if (err.error.status === 404) {
          this.errorBye = true;
          this.searchError = 'Cidadão não encontrado!';
        }
      });
    }


  }
  newCitizen(groupValue: string) {
    if (groupValue === 'cpf') {
      localStorage.setItem('newCpf', this.buscado);
    } else if (groupValue === 'rg') {
      localStorage.setItem('newRg', this.buscado);
    }
  }
  removeCitizen() {
    localStorage.removeItem('citizen');
  }
  // At the drag drop area
  // (drop)="onDropFile($event)"
  // onDropFile(event: DragEvent) {
  //   event.preventDefault();
  //   this.uploadFile(event.dataTransfer.files);
  // }

  // // At the drag drop area
  // // (dragover)="onDragOverFile($event)"
  // onDragOverFile(event) {
  //   event.stopPropagation();
  //   event.preventDefault();
  // }

  // At the file input element
  // (change)="selectFile($event)"
  selectFile(event) {
    this.uploadFile(event.target.files);
  }

  uploadingFileToServer() {
    this.uploading = true;
  }

  uploadFile(files: FileList) {
    this.uploadCompleted = false;
    if (files.length === 0) {
      return;
    }
    const fileToUpload: File = files[0];
    const csv: CsvFile = {
      File: fileToUpload
    };
    this.uploadingFileToServer();
    this.apiService.uploadFile(csv)
      .subscribe(
        res => {
          this.uploadCompleted = true;
          this.uploading = false;
          this.countOfUploaded = res.length;
        },
        err => {
          this.uploading = false;
          this.errorBye = true;
          if (err.status === 500) { // api deveria retornar o que está errado
            this.uploadError = ('Erro no upload, por favor verifique se o arquivo segue o padrão adotado pelo projeto.\n'
              + 'Caso siga, entre em contato com os desenvolvedores e informe erro 500 e tire uma foto do que está abaixo: \n'
              + 'Mensagem: ' + err.message
              + '\nNome do erro: ' + err.name);
          } else {
            this.uploadError = ('Erro desconhecido no upload.\n'
              + 'Entre em contato com os desenvolvedores e informe o erro e tire uma foto do que está abaixo:\n '
              + 'Mensagem: ' + err.message
              + '\nNome do erro: ' + err.name);
          }
        }
      );
  }
}
