import { Cidadao } from './cidadao';

export interface Medico {
  nome: string;
  crm: string;
  cidadaosAtuais?: Cidadao[];
  cidadaosAtendidos?: Cidadao[];
}
