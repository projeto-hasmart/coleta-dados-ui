import { Cidadao } from './cidadao';
export interface RelatorioOpiniao {
    relatorioCidadao: string;
    dataRelatorio?: string;
    tipoContato?: number;
    id?: string;
    nomeAnonimizado?: string;
    relatorNome?: string;
    success?: boolean;
    cidadaoId?: string;
    cidadao?: Cidadao;
    horaRelatorio?: string;
}
