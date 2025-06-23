import z from "zod/v4";
import { gameSelectSchema } from "../db/schemas";

export const gamesSchema = z.array(gameSelectSchema);
