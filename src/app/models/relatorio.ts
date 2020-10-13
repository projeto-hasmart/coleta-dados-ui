import { Cidadao } from './cidadao';

export interface Relatorio {
  cidadao: string;
  medicoesS: number;
  medicoesR: number;
  telefone: string;
  telefonesecundario?: string;
  telefoneterciario?: string;

}
