import { defineConfig } from "drizzle-kit";
import env from "./env";

console.log("database url ", env.DB_URL);

export default defineConfig({
  out: "./server/db/migrations",
  schema: "./server/db/schemas/**/*",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DB_URL,
  },
});
