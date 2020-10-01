import { CidadaoServiceService } from './../../services/cidadao/cidadao-service.service';
import { Component, OnInit } from '@angular/core';
interface MacroRegiao {
  nome: string;
}
@Component({
  selector: 'app-pagina-farmacia',
  templateUrl: './pagina-farmacia.component.html',
  styleUrls: ['./pagina-farmacia.component.scss']
})
export class PaginaFarmaciaComponent implements OnInit {

  complemento: string;
  cep: string;
  rua: string;
  cidade: string;
  estado: string;
  numero: string;
  macroregiao: string;
  nomeFantasia: string;
  macroRegioes: MacroRegiao[] = [
    {nome: 'Cariri'},
    {nome: 'Centro-Sul'},
    {nome: 'Sertão Central'}
  ];
  constructor(private cz: CidadaoServiceService) { }

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
}
