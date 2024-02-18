import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface Database {
  transacoes: Transacoes;
  carteira: CarteiraTable;
}

export type CarteiraTable = {
  id: Generated<number>;
  limite: number;
  saldo: number;
};

export type TransacoesTable = {
  id: Generated<number>;
  carteira_id: number;
  valor: number;
  tipo: "c" | "d";
  descricao: string;
  realizada_em: ColumnType<Date, string | undefined, never>;
};

export type Carteira = Selectable<CarteiraTable>;
export type NewCarteira = Insertable<CarteiraTable>;
export type CarteiraUpdate = Updateable<CarteiraTable>;

export type Transacoes = Selectable<TransacoesTable>;
export type NewTransacoes = Insertable<TransacoesTable>;
export type TransacoesUpdate = Updateable<TransacoesTable>;
