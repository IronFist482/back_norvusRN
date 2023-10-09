import type { Request } from "express";
import type z from "zod";

export async function zParse<
  TBody extends z.ZodType | undefined = z.ZodType,
  TParams extends z.ZodType | undefined = z.ZodType,
  TQuery extends z.ZodType | undefined = z.ZodType
>(
  schemas: { body?: TBody; params?: TParams; query?: TQuery },
  req: Request
): Promise<{
  body: TBody extends z.ZodType ? z.infer<TBody> : undefined;
  params: TParams extends z.ZodType ? z.infer<TParams> : undefined;
  query: TQuery extends z.ZodType ? z.infer<TQuery> : undefined;
}> {
  const { body, params, query } = schemas;
  const parsedBody = body?.parse(req.body);
  const parsedParams = params?.parse(req.params);
  const parsedQuery = query?.parse(req.query);

  const parsed = {
    body: parsedBody as any,
    params: parsedParams as any,
    query: parsedQuery as any,
  };

  return parsed;
}
