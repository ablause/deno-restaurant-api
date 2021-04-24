import { ZodSchema } from "https://deno.land/x/zod@v3.0.0-alpha.33/mod.ts";
import { Context, helpers } from "https://deno.land/x/oak@v7.3.0/mod.ts";
import { Status } from "https://deno.land/std@0.94.0/http/mod.ts";

const validation = (schema: ZodSchema<any>) => {
  return async (context: Context, next: () => void) => {
    const { value } = context.request.body();

    schema.parseAsync(value)
      .then(() => next())
      .catch((err) => context.throw(Status.BadRequest, err));
  };
};

export default validation;
