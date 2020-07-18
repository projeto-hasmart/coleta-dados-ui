import { Medicao } from './medicao';
import { DadosPessoais } from './dadosPessoais';
import { IndicadorRiscoHAS } from './indicadorRiscoHAS';
import { Dispensacao } from './dispensacao';

export interface Cidadao {
  nome: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  dataCadastro?: string;
  dadosPessoais: DadosPessoais;
  indicadorRiscoHAS: IndicadorRiscoHAS;
  medicoes?: any[];
  dispensacoes?: Array<Dispensacao>;
  podeRealizarMedicao?: boolean;
  dataProximaMedicao?: string;
  dataUltimaMedicao?: string;
  podeRealizarDispensacao?: boolean;
  dataProximaDispensacao?: string;
  dataUltimaDispensacao?: string;
  id?: number;
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
