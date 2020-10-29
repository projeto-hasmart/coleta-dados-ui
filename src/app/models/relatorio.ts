import { Cidadao } from './cidadao';

export interface Relatorio {
  cidadao: string;
  medicoesS: number;
  medicoesR: number;
  telefone: string;
  ultimaVisita: string;
  telefonesecundario?: string;
  telefoneterciario?: string;
  cpf: string;
}
