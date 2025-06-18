import { drizzle } from "drizzle-orm/postgres-js";
import "dotenv/config";
import env from "../../env";
import * as schemas from "./schemas";

const db = drizzle(env.DB_URL as string, { schema: schemas });
export default db;
