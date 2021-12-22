import BaseMongoService from "./mongo.service.ts";
import type { Restaurant } from "../models/restaurant.schema.ts";

class RestaurantService extends BaseMongoService<Restaurant> {
  constructor() {
    super({ collection: "restaurants" });
  }
}

export default RestaurantService;
