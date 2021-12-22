import type { AnyZodObject, ZodError } from "zod/mod.ts";
import { RouteParams, RouterMiddleware, Status } from "oak/mod.ts";
import { State } from "../types/mod.ts";

const validate = <R extends string = "">(
  schema: AnyZodObject,
): RouterMiddleware<R, RouteParams<R>, State> => {
  return async (context, next) => {
    try {
      if (context.params) {
        await schema.parseAsync(context.params);
      }

      if (context.request.hasBody) {
        const body = await context.request.body()
          .value;

        await schema.parseAsync(body);
      }
    } catch (error) {
      context.throw(Status.BadRequest, (error as ZodError).message);
    }

    await next();
  };
};

export default validate;
