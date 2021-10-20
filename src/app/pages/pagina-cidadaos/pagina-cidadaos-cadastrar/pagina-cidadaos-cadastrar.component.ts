import { MedicoService } from './../../../services/medico/medico.service';
import { Medico } from 'src/app/models/medico';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CidadaoServiceService } from 'src/app/services/cidadao/cidadao-service.service';
import { MedicaoServiceService } from 'src/app/services/medicao/medicao-service.service';
import { DispensacaoServiceService } from 'src/app/services/dispensacao/dispensacao-service.service';
import { Router } from '@angular/router';
import { Cidadao } from 'src/app/models/cidadao';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ViewChild, ElementRef} from '@angular/core';

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
  // tslint:disable-next-line: no-output-native
  @Output() close = new EventEmitter<boolean>();
  @ViewChild('closeModalBtn', {static: false}) closeModalBtn: ElementRef;
  checked: true;
  disabled: false;
  apiService: ApiService;
  cz: CidadaoServiceService;
  mz: MedicaoServiceService;
  dz: MedicoService;
  oNovoCidadao: Cidadao;
  historicoAvc = 0;
  doencaRenal = 0;
  insuficienciaCardiaca = 0;
  infarto = 0;
  doencaArterial = 0;
  retinopatia = 0;
  diabetes;
  fumante;
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
  user: Medico;
  exists = false;
  unknownError = false;

  constructor(cz: CidadaoServiceService, mz: MedicaoServiceService, dz: MedicoService, apiService: ApiService,
              private router: Router) {
    this.cz = cz;
    this.mz = mz;
    this.dz = dz;
    this.apiService = apiService;
   }
  genero;
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
    this.user = JSON.parse(localStorage.getItem('currentUser')) as Medico;
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
    if ((parseFloat(this.altura) < 2.7 && parseFloat(this.altura) > 0.5) || this.altura === undefined) {
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
  verificaCep(cep: string) {
    if (cep.length === 8) {
      this.cz.pegaremosCep(cep).subscribe(data => {
        this.rua = data.logradouro;
        this.cidade = data.localidade;
        this.estado = data.uf;
      });
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
          rua: this.rua,
          numero: this.numero,
          cep: this.cep
        },
        email: this.email,
        telefone: this.telefone,
        genero: this.genero
      },
      indicadorRiscoHAS: {
        altura: parseFloat(this.altura),
        diabetico: this.diabetes,
        fumante: this.fumante,
        historicoAvc: this.historicoAvc,
        doencaRenalCronica: this.doencaRenal,
        insuficienciaCardiaca: this.insuficienciaCardiaca,
        historicoInfarto: this.infarto,
        doencaArterialObstrutivaPeriferica: this.doencaArterial,
        retinopatiaHipertensiva: this.retinopatia
      }
    };
    this.apiService.createCidadao(this.oNovoCidadao).subscribe(
      res => {
        this.dz.addCitizenToMedico(this.user.id, this.cpf).subscribe(resp => {
        },
        err => {
          this.closeModalBtn.nativeElement.click();
          this.errorBye = true;
          this.valid = false;
        });
      },
      err => {
        if (err.status === 400) {
          this.exists = true;
        } else {
          this.unknownError = true;
        }
        this.closeModalBtn.nativeElement.click();
        this.errorBye = true;
        this.valid = false;
      });

  }
  errorFound() {
    console.log(this.apiService.statusCode);
    if (this.apiService.statusCode === 400) {
      console.log('erro');
    }
  }
  goToView() {
    this.cz.getAllCidadaos(this.cpf).subscribe(cidadao => {
      this.cz.cidadaos = cidadao as Cidadao[];
      this.cz.selecionadoId = cidadao[0].id;
      this.router.navigate(['/cidadaos/visualizar/' + this.cz.selecionadoId]);
    });
  }
}
