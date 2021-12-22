import { Application } from "oak/mod.ts";
import { router } from "./routes/mod.ts";
import { handleError, logger } from "./middlewares/mod.ts";
import { State } from "./types/oak.interfaces.ts";

const app = new Application<State>();

app.use(logger);
app.use(handleError);

// Routes :
app.use(router.routes())
  .use(router.allowedMethods());

export default app;
