import type {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  Handler,
  Router,
} from "express";
import type { z, AnyZodObject } from "zod";
import { ZodError } from "zod";
import { zodErrorToErrors } from "@/utils";

type MiddlewareOpts<
  TBody extends AnyZodObject = AnyZodObject,
  TParams extends AnyZodObject = AnyZodObject,
  TQuery extends AnyZodObject = AnyZodObject
> = {
  body?: TBody;
  params?: TParams;
  query?: TQuery;
};

type ExpressMethods =
  | "all"
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "options"
  | "head";

type RequestWithMiddlewareHandler<T extends MiddlewareOpts> =
  T extends MiddlewareOpts<infer TBody, infer TParams, infer TQuery>
    ? RequestHandler<
        TParams extends AnyZodObject ? z.infer<TParams> : unknown,
        unknown,
        TBody extends AnyZodObject ? z.infer<TBody> : unknown,
        TQuery extends AnyZodObject ? z.infer<TQuery> : unknown
      >
    : never;

async function zParse<
  TBody extends AnyZodObject | undefined = undefined,
  TParams extends AnyZodObject | undefined = undefined,
  TQuery extends AnyZodObject | undefined = undefined
>(
  schemas: { body?: TBody; params?: TParams; query?: TQuery },
  req: Request
): Promise<{
  body: TBody extends AnyZodObject ? z.infer<TBody> : undefined;
  params: TParams extends AnyZodObject ? z.infer<TParams> : undefined;
  query: TQuery extends AnyZodObject ? z.infer<TQuery> : undefined;
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

function middlewareZParse<
  TBody extends AnyZodObject | undefined = AnyZodObject,
  TParams extends AnyZodObject | undefined = AnyZodObject,
  TQuery extends AnyZodObject | undefined = AnyZodObject
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

class Controller {
  path: string;
  method: ExpressMethods;
  middlewares: Array<Handler>;
  handler: Handler;

  constructor(
    path: string,
    method: ExpressMethods,
    middlewares: Array<Handler>,
    handler: Handler
  ) {
    this.path = path;
    this.method = method;
    this.middlewares = middlewares;
    this.handler = handler;
  }
}

function createControllerFn<
  TBody extends AnyZodObject = AnyZodObject,
  TParams extends AnyZodObject = AnyZodObject,
  TQuery extends AnyZodObject = AnyZodObject
>(
  path: string,
  method: ExpressMethods,
  schemas: { body?: TBody; params?: TParams; query?: TQuery },
  handler: RequestWithMiddlewareHandler<MiddlewareOpts<TBody, TParams, TQuery>>
): Controller {
  const middlewares = [middlewareZParse(schemas)];
  return new Controller(path, method, middlewares, handler as any);
}

const createController = {
  all: function <
    TBody extends AnyZodObject = AnyZodObject,
    TParams extends AnyZodObject = AnyZodObject,
    TQuery extends AnyZodObject = AnyZodObject
  >(
    path: string,
    handler: RequestWithMiddlewareHandler<
      MiddlewareOpts<TBody, TParams, TQuery>
    >,
    schemas?: { body?: TBody; params?: TParams; query?: TQuery }
  ): Controller {
    return createControllerFn(path, "all", schemas ?? {}, handler);
  },

  get: function <
    TBody extends AnyZodObject = AnyZodObject,
    TParams extends AnyZodObject = AnyZodObject,
    TQuery extends AnyZodObject = AnyZodObject
  >(
    path: string,
    handler: RequestWithMiddlewareHandler<
      MiddlewareOpts<TBody, TParams, TQuery>
    >,
    schemas?: { body?: TBody; params?: TParams; query?: TQuery }
  ): Controller {
    return createControllerFn(path, "get", schemas ?? {}, handler);
  },

  post: function <
    TBody extends AnyZodObject = AnyZodObject,
    TParams extends AnyZodObject = AnyZodObject,
    TQuery extends AnyZodObject = AnyZodObject
  >(
    path: string,
    handler: RequestWithMiddlewareHandler<
      MiddlewareOpts<TBody, TParams, TQuery>
    >,
    schemas?: { body?: TBody; params?: TParams; query?: TQuery }
  ): Controller {
    return createControllerFn(path, "post", schemas ?? {}, handler);
  },

  put: function <
    TBody extends AnyZodObject = AnyZodObject,
    TParams extends AnyZodObject = AnyZodObject,
    TQuery extends AnyZodObject = AnyZodObject
  >(
    path: string,
    handler: RequestWithMiddlewareHandler<
      MiddlewareOpts<TBody, TParams, TQuery>
    >,
    schemas?: { body?: TBody; params?: TParams; query?: TQuery }
  ): Controller {
    return createControllerFn(path, "put", schemas ?? {}, handler);
  },

  delete: function <
    TBody extends AnyZodObject = AnyZodObject,
    TParams extends AnyZodObject = AnyZodObject,
    TQuery extends AnyZodObject = AnyZodObject
  >(
    path: string,
    handler: RequestWithMiddlewareHandler<
      MiddlewareOpts<TBody, TParams, TQuery>
    >,
    schemas?: { body?: TBody; params?: TParams; query?: TQuery }
  ): Controller {
    return createControllerFn(path, "delete", schemas ?? {}, handler);
  },

  head: function <
    TBody extends AnyZodObject = AnyZodObject,
    TParams extends AnyZodObject = AnyZodObject,
    TQuery extends AnyZodObject = AnyZodObject
  >(
    path: string,
    handler: RequestWithMiddlewareHandler<
      MiddlewareOpts<TBody, TParams, TQuery>
    >,
    schemas?: { body?: TBody; params?: TParams; query?: TQuery }
  ): Controller {
    return createControllerFn(path, "head", schemas ?? {}, handler);
  },

  options: function <
    TBody extends AnyZodObject = AnyZodObject,
    TParams extends AnyZodObject = AnyZodObject,
    TQuery extends AnyZodObject = AnyZodObject
  >(
    path: string,
    handler: RequestWithMiddlewareHandler<
      MiddlewareOpts<TBody, TParams, TQuery>
    >,
    schemas?: { body?: TBody; params?: TParams; query?: TQuery }
  ): Controller {
    return createControllerFn(path, "patch", schemas ?? {}, handler);
  },

  patch: function <
    TBody extends AnyZodObject = AnyZodObject,
    TParams extends AnyZodObject = AnyZodObject,
    TQuery extends AnyZodObject = AnyZodObject
  >(
    path: string,
    handler: RequestWithMiddlewareHandler<
      MiddlewareOpts<TBody, TParams, TQuery>
    >,
    schemas?: { body?: TBody; params?: TParams; query?: TQuery }
  ): Controller {
    return createControllerFn(path, "patch", schemas ?? {}, handler);
  },
} satisfies Record<ExpressMethods, any>;

class ControllerMonad {
  controllers: Controller[] = [];

  all<
    TBody extends AnyZodObject = AnyZodObject,
    TParams extends AnyZodObject = AnyZodObject,
    TQuery extends AnyZodObject = AnyZodObject
  >(
    path: string,
    handler: RequestWithMiddlewareHandler<
      MiddlewareOpts<TBody, TParams, TQuery>
    >,
    schemas?: { body?: TBody; params?: TParams; query?: TQuery }
  ): ControllerMonad {
    this.controllers.push(
      createControllerFn(path, "all", schemas ?? {}, handler)
    );
    return this;
  }

  get<
    TBody extends AnyZodObject = AnyZodObject,
    TParams extends AnyZodObject = AnyZodObject,
    TQuery extends AnyZodObject = AnyZodObject
  >(
    path: string,
    handler: RequestWithMiddlewareHandler<
      MiddlewareOpts<TBody, TParams, TQuery>
    >,
    schemas?: { body?: TBody; params?: TParams; query?: TQuery }
  ): ControllerMonad {
    this.controllers.push(
      createControllerFn(path, "get", schemas ?? {}, handler)
    );
    return this;
  }

  post<
    TBody extends AnyZodObject = AnyZodObject,
    TParams extends AnyZodObject = AnyZodObject,
    TQuery extends AnyZodObject = AnyZodObject
  >(
    path: string,
    handler: RequestWithMiddlewareHandler<
      MiddlewareOpts<TBody, TParams, TQuery>
    >,
    schemas?: { body?: TBody; params?: TParams; query?: TQuery }
  ): ControllerMonad {
    this.controllers.push(
      createControllerFn(path, "post", schemas ?? {}, handler)
    );
    return this;
  }

  put<
    TBody extends AnyZodObject = AnyZodObject,
    TParams extends AnyZodObject = AnyZodObject,
    TQuery extends AnyZodObject = AnyZodObject
  >(
    path: string,
    handler: RequestWithMiddlewareHandler<
      MiddlewareOpts<TBody, TParams, TQuery>
    >,
    schemas?: { body?: TBody; params?: TParams; query?: TQuery }
  ): ControllerMonad {
    this.controllers.push(
      createControllerFn(path, "put", schemas ?? {}, handler)
    );
    return this;
  }

  delete<
    TBody extends AnyZodObject = AnyZodObject,
    TParams extends AnyZodObject = AnyZodObject,
    TQuery extends AnyZodObject = AnyZodObject
  >(
    path: string,
    handler: RequestWithMiddlewareHandler<
      MiddlewareOpts<TBody, TParams, TQuery>
    >,
    schemas?: { body?: TBody; params?: TParams; query?: TQuery }
  ): ControllerMonad {
    this.controllers.push(
      createControllerFn(path, "delete", schemas ?? {}, handler)
    );
    return this;
  }

  head<
    TBody extends AnyZodObject = AnyZodObject,
    TParams extends AnyZodObject = AnyZodObject,
    TQuery extends AnyZodObject = AnyZodObject
  >(
    path: string,
    handler: RequestWithMiddlewareHandler<
      MiddlewareOpts<TBody, TParams, TQuery>
    >,
    schemas?: { body?: TBody; params?: TParams; query?: TQuery }
  ): ControllerMonad {
    this.controllers.push(
      createControllerFn(path, "head", schemas ?? {}, handler)
    );
    return this;
  }

  registerControllers(router: Router): void {
    this.controllers.forEach((route) => {
      const { method, path, middlewares, handler } = route;
      router[method](path, ...middlewares, handler);
    });
  }
}

export { ControllerMonad, createController, middlewareZParse };
