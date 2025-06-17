import { expand } from "dotenv-expand";
// import { env } from "process";

import { ZodError, z } from "zod";
import { config } from "dotenv";

const EnvSchema = z.object({
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_PORT: z.coerce.number(),

  DB_URL: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

// allow to read thsi syntax in .env file "${DB_USER}..."
expand(config());

try {
  EnvSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    let message = "Missing required values in .env:\n";
    error.issues.forEach((issue) => {
      message += issue.path[0] + "\n";
    });
    const e = new Error(message);
    e.stack = "";
    throw e;
  } else {
    console.error(error);
  }
}

export default EnvSchema.parse(process.env);
