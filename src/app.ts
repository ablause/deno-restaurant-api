import { Application } from "https://deno.land/x/oak@v7.3.0/mod.ts";
import { logger } from "./middlewares/mod.ts";
import { router } from "./routes/mod.ts";

const app = new Application();

app.use(logger);

// Routes :
app.use(router.routes())
  .use(router.allowedMethods());

export default app;
