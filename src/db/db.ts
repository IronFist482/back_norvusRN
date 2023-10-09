import { PrismaClient } from "@prisma/client";

export const bd: PrismaClient = globalThis.bd || new PrismaClient();

if (process.env.NODE_ENV === "development") {
  globalThis.bd = bd;
}

bd.$connect();
