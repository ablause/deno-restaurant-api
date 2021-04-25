import { Context } from "https://deno.land/x/oak@v7.3.0/mod.ts";

const logger = async (context: Context, next: () => any) => {
  await next();

  const body = await context.request.body().value;
  const params = body ? JSON.stringify(body) : "";

  console.log(`${context.request.method} ${context.request.url} - ${params}`);
};

export default logger;
