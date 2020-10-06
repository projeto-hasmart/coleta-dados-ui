import { Farmacia } from './../../models/farmacia';
import { AdminService } from './../../services/admin/admin.service';
import { CidadaoServiceService } from './../../services/cidadao/cidadao-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
interface MacroRegiao {
  nome: string;
  value: number;
}
@Component({
  selector: 'app-pagina-farmacia',
  templateUrl: './pagina-farmacia.component.html',
  styleUrls: ['./pagina-farmacia.component.scss']
})
export class PaginaFarmaciaComponent implements OnInit {
  @ViewChild('closebutton', { static: false }) closebutton;
  @ViewChild('myModal', { static: false }) myModal;
  error;
  statusError;
  checkEmpty = false;
  valid = false;
  errorBye = false;
  aNovaFarmacia: Farmacia;
  complemento: string;
  cep: string;
  rua: string;
  cidade: string;
  estado: string;
  numero: string;
  macroregiao: number;
  nomeFantasia: string;
  razaoSocial: string;
  email: string;
  cnpj: string;
  telefone: string;
  macroRegioes: MacroRegiao[] = [
    {nome: 'Cariri', value: 1},
    {nome: 'Centro-Sul', value: 2},
    {nome: 'Grande Fortaleza', value: 3},
    {nome: 'Litoral Leste', value: 4},
    {nome: 'Litoral Norte', value: 5},
    {nome: 'Litoral Oeste/Vale do Curu', value: 6},
    {nome: 'Maciço de Baturité', value: 7},
    {nome: 'Serra da Ibiapabada', value: 8},
    {nome: 'Sertão Central', value: 9},
    {nome: 'Sertão de Canindé', value: 10},
    {nome: 'Sertão de Crateús', value: 11},
    {nome: 'Sertão de Sobral', value: 12},
    {nome: 'Sertão dos Inhamuns', value: 13},
    {nome: 'Vale do Jaguaribe', value: 14}
  ];
  constructor(private cz: CidadaoServiceService, private fz: AdminService) { }

  ngOnInit() {
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
  checkEmpt() {
    if (this.razaoSocial === undefined || this.nomeFantasia === undefined || this.cnpj === undefined ||
      this.cidade === undefined || this.estado === undefined || this.cep === undefined || this.rua === undefined
      || this.numero === undefined || this.email === undefined || this.telefone === undefined || this.cnpj.length < 14) {
        this.checkEmpty = true;
    } else {
      this.valid = true;
      this.cadastraFarmacia();

    }

  }
  async cadastraFarmacia() {
    this.aNovaFarmacia = {
      nomeFantasia: this.nomeFantasia,
      razaoSocial: this.razaoSocial,
      cnpj: this.cnpj,
      endereco: {
        rua: this.rua,
        numero: this.numero,
        cidade: this.cidade,
        estado: this.estado,
        complemento: this.complemento,
        macroregiao: this.macroregiao,
        cep: this.cep
      }
    };
    this.fz.createFarmacia(this.aNovaFarmacia).subscribe(
      res => {
        console.log(this.aNovaFarmacia);

      },
      err => {
        this.error = err;
        console.log(this.aNovaFarmacia);
        this.valid = false;
        this.statusError = err.status;
        // this.errorBye = true;
        // this.valid = false;
        console.log(err);
      });
  }
}
