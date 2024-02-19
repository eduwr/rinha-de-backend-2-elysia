import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface Database {
  transacoes: Transacao;
  carteira: CarteiraTable;
}

export type CarteiraTable = {
  id: Generated<number>;
  limite: number;
  saldo: number;
};

export type TransacaoTable = {
  id?: Generated<number>;
  carteira_id: number;
  valor: number; 
  tipo: "c" | "d";
  descricao: string;
  realizada_em: ColumnType<Date, string | undefined, never>;
};

export type Carteira = Selectable<CarteiraTable>;
export type NewCarteira = Insertable<CarteiraTable>;
export type CarteiraUpdate = Updateable<CarteiraTable>;

export type Transacao = Selectable<TransacaoTable>;
export type NewTransacao = Insertable<TransacaoTable>;
export type TransacaoUpdate = Updateable<TransacaoTable>;
