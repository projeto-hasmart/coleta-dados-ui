import { Medicao } from './medicao';
import { DadosPessoais } from './dadosPessoais';
import { IndicadorRiscoHAS } from './indicadorRiscoHAS';
import { Dispensacao } from './dispensacao';

export interface Cidadao {
  nome: string;
  cpf: string;
  rg: string;
  dataNascimento: Date;
  dataCadastro: Date;
  dadosPessoais: DadosPessoais;
  indicadorRiscoHAS: IndicadorRiscoHAS;
  medicoes: Array<Medicao>;
  dispensacoes: Array<Dispensacao>;
  podeRealizarMedicao: boolean;
  dataProximaMedicao: Date;
  podeRealizarDispensacao: boolean;
  dataProximaDispensacao: Date;
  id: number;
}
/* {
  "nome": "string",
  "cpf": "string",
  "rg": "string",
  "dataNascimento": "00/00/0000",
  "dataCadastro": "00/00/0000",
  "dadosPessoais": {
    "endereco": {
      "rua": "string",
      "numero": "string",
      "complemento": "string",
      "cidade": "string",
      "estado": "string"
    } */
