import { Afericao } from './afericao';
import { Medicamento } from './medicamento';

export interface Medicao {
  afericoes: Afericao[];
  peso:	number;
  dataHora?: string;
  estabelecimentoId?: any;
  cidadaoId?: number;
  id?: string;
  medicamentos?: Medicamento[];
}

export interface MobileMedicao {
  sistolica;
  diastolica;
  peso;
  dataHora;
}
