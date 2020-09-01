import { Afericao } from './afericao';
import { Medicamento } from './medicamento';

export interface Medicao {
  afericoes: Afericao[];
  peso:	number;
  dataHora?: string;
  estabelecimentoId?: number;
  cidadaoId?: number;
  id?: number;
  medicamentos?: Medicamento[];
}
