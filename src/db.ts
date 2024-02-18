import { Kysely, PostgresDialect } from "kysely";

import { Pool } from "pg";
import { Database } from "./types";

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: Bun.env.DATABASE_URL,
    }),
  }),
});
