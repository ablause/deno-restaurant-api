import { Application } from "https://deno.land/x/oak@v7.3.0/mod.ts";
import { restaurantRouter } from "./routes/mod.ts";
import { logger } from "./middlewares/mod.ts";

const app = new Application();

// app.use(logger);

// Routes :
app.use(restaurantRouter.routes())
  .use(restaurantRouter.allowedMethods());

export default app;
