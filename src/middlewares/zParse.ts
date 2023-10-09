import { zParse } from "@lib";
import { zodErrorToErrors } from "@/utils";
import { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";

function middlewareZParse<
  TBody extends z.ZodType | undefined = z.ZodType,
  TParams extends z.ZodType | undefined = z.ZodType,
  TQuery extends z.ZodType | undefined = z.ZodType
>(schemas: { body?: TBody; params?: TParams; query?: TQuery }) {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { body, params, query } = await zParse(schemas, req);

      req.body = body;
      if (params) req.params = params;
      if (query) req.query = query;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ errors: zodErrorToErrors(error) });
        return;
      }
      res.status(500).json({ error: JSON.stringify(error) });
    }
  };
}

export { middlewareZParse };
