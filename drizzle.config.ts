import { type Config } from "drizzle-kit";

import { env } from "~/env";

console.log("env.DATABASE_URL", env);
export default {
  schema: "./src/server/db/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["u236571955_drafter_db*"],
} satisfies Config;
