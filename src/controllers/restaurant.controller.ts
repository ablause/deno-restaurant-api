import { Bson } from "https://deno.land/x/mongo@v0.22.0/mod.ts";
import { Status, STATUS_TEXT } from "https://deno.land/std@0.94.0/http/mod.ts";
import type { RouterContext } from "https://deno.land/x/oak@v7.3.0/mod.ts";

import RestaurantService from "../services/restaurant.service.ts";
import BaseController from "../utilities/baseController.ts";
import type { Restaurant } from "../models/restaurant.model.ts";

class RestaurantController extends BaseController {
  private restaurantService = new RestaurantService();

  /**
   * createRestaurant
   */
  public async createRestaurant(context: RouterContext) {
    const values: Restaurant = await context.request.body().value;

    try {
      const documentID = await this.restaurantService.create(values);

      context.response.status = Status.Created;
      context.response.body = this.sanitize({ _id: documentID, ...values });
    } catch (error) {
      context.throw(500, error.message);
    }
  }

  /**
   * getRestaurants
   */
  public async getRestaurants(context: RouterContext) {
    const { offset, limit } = this.getParsedQuery(context);

    try {
      const documents = await this.restaurantService.find({}, {
        limit,
        skip: offset,
      });

      context.response.status = Status.OK;
      context.response.body = this.sanitize(documents);
    } catch (error) {
      context.throw(Status.NotFound, error.message);
    }
  }

  /**
   * getRestaurantByID
   */
  public async getRestaurantByID(context: RouterContext) {
    const { fields, ...query } = this.getParsedQuery(context);

    try {
      const _id = new Bson.ObjectID(query[this.params.id]);
      const document = await this.restaurantService.findOne({ _id }, {
        projection: fields,
      });

      context.response.status = Status.OK;
      context.response.body = this.sanitize(document);
    } catch (error) {
      context.throw(Status.NotFound, error.message);
    }
  }

  /**
   * updateRestaurantByID
   */
  public async updateRestaurantByID(context: RouterContext) {
    const query = this.getParsedQuery(context);
    const updatedValue: Restaurant = await context.request.body().value;

    try {
      const _id = new Bson.ObjectID(query[this.params.id]);
      await this.restaurantService.updateOne({ _id }, updatedValue);

      context.response.status = Status.NoContent;
    } catch (error) {
      context.throw(Status.InternalServerError, error.message);
    }
  }

  /**
   * deleteRestaurantByID
   */
  public async deleteRestaurantByID(context: RouterContext) {
    const query = this.getParsedQuery(context);

    try {
      const _id = new Bson.ObjectID(query[this.params.id]);
      await this.restaurantService.deleteOne({ _id });

      context.response.status = Status.NoContent;
    } catch (error) {
      context.throw(Status.InternalServerError, error.message);
    }
  }
}

export default RestaurantController;
