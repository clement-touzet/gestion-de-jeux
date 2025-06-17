import { drizzle } from "drizzle-orm/postgres-js";
import "dotenv/config";
import env from "env";

const db = drizzle(env.DB_URL as string);
export default db;
