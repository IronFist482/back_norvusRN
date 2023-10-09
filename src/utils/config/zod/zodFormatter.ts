import { ZodError } from "zod";

export function zodErrorToErrors(error: ZodError) {
  return error.errors.map((err) => ({
    name: `Validation error: ${err.path.join(".")}`,
    message: `expected ${(err as any).expected}, recieved ${
      (err as any).recieved
    }: ${err.message}`,
  }));
}
