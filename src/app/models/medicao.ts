import { Afericao } from './afericao';

export interface Medicao {
  afericoes: Afericao[];
  peso:	number;
  dataHora?: string;
  estabelecimentoId?: number;
  cidadaoId?: number;
  id?: number;
}
