import { helpers, Router, Status } from "oak/mod.ts";

import RestaurantService from "../services/restaurant.service.ts";
import RestaurantSchema from "../models/restaurant.schema.ts";
import { permission, validate } from "../middlewares/mod.ts";
import { State } from "../types/mod.ts";

const router = new Router<State>({ prefix: "/restaurants" });
const service = new RestaurantService();

router.use(validate(RestaurantSchema));

// GET ALL
router.get("/", async (ctx) => {
  const { limit, page } = helpers.getQuery(ctx);

  const data = await service.getAll(+limit, +page);

  ctx.response.status = Status.OK;
  ctx.response.body = data;
});

// GET ONE
router.get("/:_id", async (ctx) => {
  const data = await service.getByIndex(ctx.params._id);

  ctx.response.status = Status.OK;
  ctx.response.body = data;
});

// CREATE
router.post("/", permission("restaurants:create"), async (ctx) => {
  const result = ctx.request.body();
  const document = await result.value;

  const data = await service.create(document);

  ctx.response.status = Status.Created;
  ctx.response.body = data;
});

// UPDATE
router.patch("/:_id", permission("restaurants:update"), async (ctx) => {
  const result = ctx.request.body();
  const document = await result.value;

  await service.updateByIndex(ctx.params._id, document);

  ctx.response.status = Status.NoContent;
});

// DELETE
router.delete("/:_id", permission("restaurants:delete"), async (ctx) => {
  await service.deleteByIndex(ctx.params._id);

  ctx.response.status = Status.NoContent;
});

export default router;
