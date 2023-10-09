import type {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  Handler,
} from "express";
import { Router } from "express";
import type { z } from "zod";
import { ZodError } from "zod";
import { zodErrorToErrors } from "@/utils";
import { middlewareZParse } from "@/middlewares";

type MiddlewareOpts<
  TBody extends z.ZodType = z.ZodType,
  TParams extends z.ZodType = z.ZodType,
  TQuery extends z.ZodType = z.ZodType
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
        TParams extends z.ZodType ? z.infer<TParams> : unknown,
        unknown,
        TBody extends z.ZodType ? z.infer<TBody> : unknown,
        TQuery extends z.ZodType ? z.infer<TQuery> : unknown
      >
    : never;

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
  TBody extends z.ZodType = z.ZodType,
  TParams extends z.ZodType = z.ZodType,
  TQuery extends z.ZodType = z.ZodType
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
    TBody extends z.ZodType = z.ZodType,
    TParams extends z.ZodType = z.ZodType,
    TQuery extends z.ZodType = z.ZodType
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
    TBody extends z.ZodType = z.ZodType,
    TParams extends z.ZodType = z.ZodType,
    TQuery extends z.ZodType = z.ZodType
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
    TBody extends z.ZodType,
    TParams extends z.ZodType,
    TQuery extends z.ZodType
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
    TBody extends z.ZodType = z.ZodType,
    TParams extends z.ZodType = z.ZodType,
    TQuery extends z.ZodType = z.ZodType
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
    TBody extends z.ZodType = z.ZodType,
    TParams extends z.ZodType = z.ZodType,
    TQuery extends z.ZodType = z.ZodType
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
    TBody extends z.ZodType = z.ZodType,
    TParams extends z.ZodType = z.ZodType,
    TQuery extends z.ZodType = z.ZodType
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
    TBody extends z.ZodType = z.ZodType,
    TParams extends z.ZodType = z.ZodType,
    TQuery extends z.ZodType = z.ZodType
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
    TBody extends z.ZodType = z.ZodType,
    TParams extends z.ZodType = z.ZodType,
    TQuery extends z.ZodType = z.ZodType
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
  private controllers: Controller[] = [];
  private isRegistered = false;
  private router: Router = Router();

  all<
    TBody extends z.ZodType = z.ZodType,
    TParams extends z.ZodType = z.ZodType,
    TQuery extends z.ZodType = z.ZodType
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
    TBody extends z.ZodType = z.ZodType,
    TParams extends z.ZodType = z.ZodType,
    TQuery extends z.ZodType = z.ZodType
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
    TBody extends z.ZodType = z.ZodType,
    TParams extends z.ZodType = z.ZodType,
    TQuery extends z.ZodType = z.ZodType
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
    TBody extends z.ZodType = z.ZodType,
    TParams extends z.ZodType = z.ZodType,
    TQuery extends z.ZodType = z.ZodType
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
    TBody extends z.ZodType = z.ZodType,
    TParams extends z.ZodType = z.ZodType,
    TQuery extends z.ZodType = z.ZodType
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
    TBody extends z.ZodType = z.ZodType,
    TParams extends z.ZodType = z.ZodType,
    TQuery extends z.ZodType = z.ZodType
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

  private registerControllers(): void {
    this.controllers.forEach((route) => {
      const { method, path, middlewares, handler } = route;
      this.router[method](path, ...middlewares, handler);
    });
  }

  get routerInstance(): Router {
    if (!this.isRegistered) {
      this.registerControllers();
      this.isRegistered = true;
    }

    return this.router;
  }
}

export { ControllerMonad, createController };
