import { Router } from "oak/mod.ts";
import { VERSION_API } from "../constants.ts";
import { State } from "../types/mod.ts";

import restaurantRouter from "./restaurants.routes.ts";

const router = new Router<State>({ prefix: VERSION_API });

router.use(restaurantRouter.routes())
  .use(restaurantRouter.allowedMethods());

export default router;
