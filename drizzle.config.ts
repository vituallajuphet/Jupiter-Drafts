import { type Config } from "drizzle-kit";

import { env } from "~/env";


console.log('env.DATABASE_URL', env)
export default {
  schema: "./src/server/db/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["jupinotes_db*"],
} satisfies Config;
