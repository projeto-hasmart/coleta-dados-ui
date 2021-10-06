import { Cidadao } from './cidadao';

export interface Medico {
  nome: string;
  id?: string;
  senha?: string;
  crm?: string;
  cidadaosAtuais?: Cidadao[];
  cidadaosAtendidos?: Cidadao[];
}
