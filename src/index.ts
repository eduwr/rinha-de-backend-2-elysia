import { Elysia, t } from "elysia";

const app = new Elysia()
  .get("/clientes/:id/extrato", () => "Hello Elysia", {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .listen(3000)
  .post(
    "/clientes/:id/transacoes",
    ({ body: { descricao, tipo, valor } }) => {
      /** 
        Uma transação de débito nunca pode deixar o saldo do cliente menor que seu limite disponível.
        Por exemplo, um cliente com limite de 1000 (R$ 10) nunca deverá ter o saldo menor que -1000 (R$ -10).
        Nesse caso, um saldo de -1001 ou menor significa inconsistência na Rinha de Backend!
      */
      if (tipo === "d") {
        // maybe return the handler here
      }

      if (tipo === "c") {
        // maybe return the handler here
      }

      return {
        limite: 100000,
        saldo: -9098,
      };
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
      body: t.Object({
        valor: t.Number(),
        tipo: t.Union([t.Literal("c"), t.Literal("d")]),
        descricao: t.String({ minLength: 1, maxLength: 10 }),
      }),
    }
  );

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
