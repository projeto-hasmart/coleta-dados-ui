import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CidadaoServiceService } from 'src/app/services/cidadao/cidadao-service.service';
import { MedicaoServiceService } from 'src/app/services/medicao/medicao-service.service';
import { DispensacaoServiceService } from 'src/app/services/dispensacao/dispensacao-service.service';
import { Router } from '@angular/router';
import { Cidadao } from 'src/app/models/cidadao';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

interface Diabetes {
  value: number;
  viewValue: string;
}
interface Fumante {
  value: number;
  viewValue: string;
}


@Component({
  selector: 'app-pagina-cidadaos-cadastrar',
  templateUrl: './pagina-cidadaos-cadastrar.component.html',
  styleUrls: ['./pagina-cidadaos-cadastrar.component.scss']
})

export class PaginaCidadaosCadastrarComponent implements OnInit {
  checked: true;
  disabled: false;
  apiService: ApiService;
  cz: CidadaoServiceService;
  mz: MedicaoServiceService;
  dz: DispensacaoServiceService;
  router: Router;
  oNovoCidadao: Cidadao;
  historicoAvc = false;
  antiHipertensivos = false;
  diabetes = 1;
  fumante = 1;
  rua: string;
  nome: string;
  cidade: string;
  estado: string;
  telefone: string;
  nascimento: string;
  complemento: string;
  cep: string;
  cpf: string;
  rg: string;
  email: string;
  altura: string;
  dataReal: any;
  checkEmpty = false;
  numero: string;
  invalidAltura = false;
  valid = false;
  errorBye = false;

  constructor(cz: CidadaoServiceService, mz: MedicaoServiceService, dz: DispensacaoServiceService, apiService: ApiService, router: Router) {
    this.cz = cz;
    this.mz = mz;
    this.dz = dz;
    this.apiService = apiService;
   }
  genero = 'Masculino';
  generos: string[] = [
    'Masculino',
    'Feminino',
    'Prefere não dizer',
    'Outro'
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
  ngOnInit() {
    if (localStorage.getItem('newCpf') !== null) {
      this.cpf = localStorage.getItem('newCpf');
      localStorage.removeItem('newCpf');
    } else if (localStorage.getItem('newRg') !== null) {
      this.rg = localStorage.getItem('newRg');
      localStorage.removeItem('newRg');
    }
  }
  checkDate() {
    const dateSendingToServer = new DatePipe('en-US').transform(this.nascimento, 'dd/MM/yyyy');
    this.dataReal = dateSendingToServer;
  }

  checkEmpt() {
    this.checkDate();
    if ( this.rua !== undefined) {
      this.numero = this.rua.split(',')[1];
    }
    if ((parseFloat(this.altura) < 3 && parseFloat(this.altura) > 0.5) || this.altura === undefined) {
    if (this.nome === undefined || this.dataReal === undefined || this.cpf === undefined || this.rg === undefined
      || this.cidade === undefined || this.estado === undefined || this.cep === undefined || this.rua === undefined
      || this.numero === undefined || this.email === undefined || this.telefone === undefined || this.altura === undefined) {
        this.checkEmpty = true;
    } else {
      this.valid = true;
      this.cadastraCidadao();

    }
  } else {
    this.invalidAltura = true;
  }
  }
  async cadastraCidadao() {
    this.oNovoCidadao = {
      nome : this.nome,
      dataNascimento: this.dataReal,
      cpf: this.cpf,
      rg: this.rg,
      dadosPessoais: {
        endereco: {
          cidade: this.cidade,
          estado: this.estado,
          complemento: this.complemento,
          rua: this.rua.split(',')[0],
          numero: this.rua.split(',')[1]
        },
        email: this.email,
        telefone: this.telefone,
        genero: this.genero
      },
      indicadorRiscoHAS: {
        altura: parseFloat(this.altura),
        diabetico: this.diabetes,
        fumante: this.fumante,
        antiHipertensivos: this.antiHipertensivos,
        historicoAvc: this.historicoAvc
      }
    };
    this.apiService.createCidadao(this.oNovoCidadao).subscribe(
      res => {
        console.log('200, OK');
      },
      err => {
        this.errorBye = true;
        this.valid = false;
        console.log(err.error.errors.Cidadão[0]);
      });

  }
  errorFound() {
    console.log(this.apiService.statusCode);
    if (this.apiService.statusCode === 400) {
      console.log('UWU clear is coming');
    }
  }
  goToView() {
    this.cz.getAllCidadaos(this.oNovoCidadao.cpf);
  }
}
