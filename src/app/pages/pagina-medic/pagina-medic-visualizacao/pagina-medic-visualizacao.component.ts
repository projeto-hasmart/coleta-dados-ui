import { CidadaoServiceService } from './../../../services/cidadao/cidadao-service.service';
import { ApiService } from './../../../services/api.service';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cidadao } from 'src/app/models/cidadao';
import { CidadaoEdit } from 'src/app/models/cidadaoEdit';
import { Medicao, MobileMedicao } from 'src/app/models/medicao';
import { HttpClient } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ViewEncapsulation } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Diabetes {
  value: number;
  viewValue: string;
}
interface Fumante {
  value: number;
  viewValue: string;
}

const MEDICAO: Medicao[] = [];


@Component({
  selector: 'app-pagina-medic-visualizacao',
  templateUrl: './pagina-medic-visualizacao.component.html',
  styleUrls: ['./pagina-medic-visualizacao.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaginaMedicVisualizacaoComponent implements OnInit {

  isCollapsed = false;
  ELEMENT_DATA: any[] = [
  ];
  ELEMENTS_DATA: any[] = [
  ];
  MOBILE_ELEMENT_DATA: any[] = [];
  oNossoCidadao: Cidadao;
  cidadao$: Observable<Cidadao>;
  ultimaMedicao: string;
  responsavel: string;
  buscado: string;
  showingCpf: string;
  showingCep: string;
  showingPhone: string;
  cidadaoEditado: CidadaoEdit;
  added;
  public innerWidth: any;
  public innerHeight: any;
  i = 0;
  j: number;
  sendingCpf: string;
  weight;
  selectedCitizen;
  displayedColumns: string[] = ['data', 'servico', 'responsavel', 'info'];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  dataSourceMedi = new MatTableDataSource<any>(this.ELEMENTS_DATA);
  selection = new SelectionModel<any>(true, []);
  isMobile;
  deviceInfo = null;
  currentDate = new Date();

  @ViewChild('infoBox', {static: false}) infoBox: ElementRef;
  @ViewChild('medicaoBox', {static: false}) medicaoBox: ElementRef;

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
constructor(private apiService: ApiService, private cz: CidadaoServiceService, private http: HttpClient,
            private deviceService: DeviceDetectorService, private router: Router) {
                this.epicFunction();
               }

ngOnInit() {
    this.selectedCitizen = localStorage.getItem('medicCitizen');
    this.innerWidth = window.innerWidth;
    this.ELEMENT_DATA = [];
    localStorage.setItem('citizen', '1');
    this.apiService.getCidadaoById(1).subscribe(cidadao => {
    this.oNossoCidadao = cidadao as Cidadao;
    this.cidadao$ = this.apiService.getCidadaoById(1);
    this.getMedicoes();
    this.genero = this.oNossoCidadao.dadosPessoais.genero;
    this.verCpf();
    this.verCep();
    this.verTelefone();
  });


}
public printAsPDF() {


  const div = document.getElementById('infoBox');
  const divv = document.getElementById('medicaoBox');
  const options = {
    background: 'white',
    scale: 3
  };
  const doc = new jsPDF('p', 'mm', 'a4', 1);

  html2canvas(div, options).then((canvas) => {

    const img = canvas.toDataURL('image/PNG');

    // Add image Canvas to PDF
    const bufferX = 5;
    const bufferY = 5;
    const imgProps = (doc as any).getImageProperties(img);
    const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

    return doc;
  });
  html2canvas(divv, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');
      doc.addPage('p', 'mm', 'a4', 1);

      // Add image Canvas to PDF
      const bufferX = 5;
      const bufferY = 5;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

      return doc;
    // tslint:disable-next-line: no-shadowed-variable
    }).then(doc => {
      window.open(
        doc.output('bloburl', { filename: 'Relatório HASmart ' + this.currentDate + '.pdf' }),
        '_blank'
      );
    });


}

public downloadAsPDF() {


  const div = document.getElementById('infoBox');
  const divv = document.getElementById('medicaoBox');
  const options = {
    background: 'white',
    scale: 3
  };
  const doc = new jsPDF('p', 'mm', 'a4');

  html2canvas(div, options).then((canvas) => {

    const img = canvas.toDataURL('image/PNG');

    // Add image Canvas to PDF
    const bufferX = 5;
    const bufferY = 5;
    const imgProps = (doc as any).getImageProperties(img);
    const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

    return doc;
  });
  html2canvas(divv, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');
      doc.addPage('p', 'mm', 'a4');

      // Add image Canvas to PDF
      const bufferX = 5;
      const bufferY = 5;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

      return doc;
    // tslint:disable-next-line: no-shadowed-variable
    }).then(doc => {
      doc.save('Relatório HASmart ' + this.currentDate + '.pdf');
    });


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
  this.ELEMENT_DATA = [];
  for (const med of this.oNossoCidadao.medicoes) {
    this.ELEMENT_DATA.push(med);
    for (const afericoes of med.afericoes) {
      this.added = {
        dataHora: med.dataHora,
        sistolica: afericoes.sistolica,
        diastolica: afericoes.diastolica,
        peso: med.peso
      };
      this.MOBILE_ELEMENT_DATA.push(this.added);
    }

  }
  // for (const disp of this.oNossoCidadao.dispensacoes) {
  //   ELEMENT_DATA.push(disp);
  // }

  this.ELEMENT_DATA.sort((a, b) => {
    return (new Date(b.dataHora.split('/').reverse().join('-')) as any) - (new Date(a.dataHora.split('/').reverse().join('-')) as any);
  });
  this.MOBILE_ELEMENT_DATA.sort((a, b) => {
    return (new Date(b.dataHora.split('/').reverse().join('-')) as any) - (new Date(a.dataHora.split('/').reverse().join('-')) as any);
  });
  this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);

}
medicaoDe(dataHora: string) {
  for (const med of this.ELEMENT_DATA) {
    if (med.dataHora === dataHora) {
      this.ELEMENTS_DATA = [];
      this.ultimaMedicao = dataHora;
      this.responsavel = med.estabelecimentoId;
      this.weight = med.peso;
      for (const af of med.afericoes) {
        this.ELEMENTS_DATA.push(af);
        this.dataSourceMedi = new MatTableDataSource(this.ELEMENTS_DATA);

      }
    }
  }
}
}
