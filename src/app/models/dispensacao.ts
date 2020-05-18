import { Medicamento } from './medicamento';

export interface Dispensacao {
  cidadaoId: number;
medicaoId:	number;
estabelecimentoId: number;
medicamentos: Array<Medicamento>;
dataHora: Date;
id: number;
}
