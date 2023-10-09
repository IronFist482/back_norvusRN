import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
dotenvExpand.expand(dotenv.config({ override: true }));

const env = createEnv({
  server: {
    MYSQL_ROOT_PASSWORD: z.string(),
    MYSQL_DATABASE: z.string(),
    MYSQL_PORT: z.coerce.number(),
    PORT: z.coerce.number(),
    NODE_ENV: z.enum(["development", "production"]),
    DATABASE_URL: z.string().url(),
    APP_URL: z.string().url(),
  },
  client: {},
  clientPrefix: "",
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  isServer: true,
});

const args = {
  watch: process.argv.includes("--watch"),
};

export const config = {
  env,
  args,
};
