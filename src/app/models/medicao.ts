import { Afericao } from './afericao';

export interface Medicao {
  cidadaoId:	number;
  estabelecimentoId:	number;
  afericoes: Array<Afericao>;
  peso:	number;
  dataHora:	Date;
}
