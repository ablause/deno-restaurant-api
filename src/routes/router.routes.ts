import { Router } from "https://deno.land/x/oak@v7.3.0/mod.ts";
import { VERSION_API } from "../constants.ts";
import restaurantRouter from "./restaurant.routes.ts";

const router = new Router({ prefix: VERSION_API });

router.use(restaurantRouter.routes())
  .use(restaurantRouter.allowedMethods());

export default router;
