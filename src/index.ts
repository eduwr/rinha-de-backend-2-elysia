import { Elysia, t } from "elysia";
import { db } from "./db";
import { NewTransacao, Transacao } from "./types";

const app = new Elysia()
  .get("/clientes/:id/extrato", () => "Hello Elysia", {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .listen(3000)
  .post(
    "/clientes/:id/transacoes",
    async ({ body: { descricao, tipo, valor }, params: { id }, set }) => {
      const [carteira] = await db
        .selectFrom("carteira")
        .selectAll()
        .where("id", "=", id)
        .limit(1)
        .execute();

      const novoSaldo =
        tipo === "c" ? carteira.saldo + valor : carteira.saldo - valor;
      console.log(carteira, novoSaldo);

      if (novoSaldo < carteira.limite) {
        set.status = 422;
        return { error: "você é pobre" };
      }

      const transacao: NewTransacao = {
        carteira_id: carteira.id,
        descricao,
        tipo,
        valor,
      } as const;

      await db
        .insertInto("transacoes")
        .values(transacao)
        .executeTakeFirstOrThrow();

      return {
        limite: 100000,
        saldo: novoSaldo,
      };
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
      body: t.Object({
        valor: t.Number(),
        tipo: t.Union([t.Literal("c"), t.Literal("d")], {
          title: "tipo inválido",
          description: "o tipo da transação só pode ser `c` ou `d`",
        }),
        descricao: t.String({ minLength: 1, maxLength: 10 }),
      }),
    }
  );

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
