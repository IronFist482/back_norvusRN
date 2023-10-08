import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

// MYSQL_ROOT_PASSWORD="root_554721_needs_hash"

// DB_HOST="localhost"
// DB_PORT="3306"
// DB_USER="dev_user"
// DB_PASS="dev_password"
// DB_NAME="norvus_bd"

// # use mysql and generate url
// DATABASE_URL="mysql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}"

const env = createEnv({
  server: {
    MYSQL_ROOT_PASSWORD: z.string(),
    MYSQL_DATABASE: z.string(),
    MYSQL_PORT: z.coerce.number(),
    PORT: z.coerce.number(),
    NODE_ENV: z.enum(["development", "production"]),
    DATABASE_URL: z.string().url(),
  },
  client: {},
  clientPrefix: "",
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});

const args = {
  watch: process.argv.includes("--watch"),
};

export const config = {
  env,
  args,
};

console.log({
  url: env.DATABASE_URL,
});
