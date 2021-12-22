import { isHttpError, Middleware, Status } from "oak/mod.ts";
import { ZodError } from "zod/mod.ts";

const handleError: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (isHttpError(error)) {
      ctx.response.status = error.status;
      ctx.response.body = { message: error.message };
    } else if (error.name === "MongoError") {
      ctx.response.status = Status.InternalServerError;
    } else if (error instanceof ZodError) {
      ctx.response.status = Status.BadRequest;
      ctx.response.body = { message: error.message };
    } else {
      throw error;
    }
  }
};

export default handleError;
