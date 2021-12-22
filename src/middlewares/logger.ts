import { Middleware } from "oak/mod.ts";

const logger: Middleware = async (context, next) => {
  await next();

  const body = await context.request.body().value;
  const params = body ? JSON.stringify(body) : "";

  console.log(`${context.request.method} ${context.request.url} - ${params}`);
};

export default logger;
