import { Medico } from 'src/app/models/medico';
import { DadosPessoais } from './dadosPessoais';
import { IndicadorRiscoHAS } from './indicadorRiscoHAS';
import { Dispensacao } from './dispensacao';
import { RelatorioOpiniao } from './relatorioOpiniao';

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
  relatorios?: Array<RelatorioOpiniao>;
  id?: string;
  medicoAtual?: Medico;
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
