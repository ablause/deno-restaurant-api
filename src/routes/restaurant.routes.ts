import { Router } from "https://deno.land/x/oak@v7.3.0/mod.ts";
import { restaurantSchema } from "../models/restaurant.model.ts";
import RestaurantController from "../controllers/restaurant.controller.ts";
import validation from "../middlewares/validation.ts";

const router = new Router({ prefix: "/restaurants" });
const controller = new RestaurantController({
  params: { id: "restaurant_id" },
});

// GET ALL
router.get("/", (context) => {
  return controller.getRestaurants(context);
});

// GET ONE
router.get("/:restaurant_id", (context) => {
  return controller.getRestaurantByID(context);
});

// CREATE
router.post("/", validation(restaurantSchema), (context) => {
  return controller.createRestaurant(context);
});

// UPDATE
router.put("/:restaurant_id", validation(restaurantSchema), (context) => {
  return controller.updateRestaurantByID(context);
});

// DELETE
router.delete("/:restaurant_id", (context) => {
  return controller.deleteRestaurantByID(context);
});

export default router;
