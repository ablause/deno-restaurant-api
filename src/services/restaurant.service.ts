import type { FindOptions } from "https://deno.land/x/mongo@v0.22.0/mod.ts";

import database from "../utilities/database.ts";
import type { Restaurant } from "../models/restaurant.model.ts";
import type { BaseDocument } from "../types.ts";

type RestaurantDoc = Restaurant & BaseDocument;
type FilterDoc = Partial<RestaurantDoc>;

class RestaurantService {
  private collection = database.collection<RestaurantDoc>("restaurants");

  public create(values: Restaurant) {
    return this.collection.insertOne(values);
  }

  public find(filter: FilterDoc, options: FindOptions) {
    return this.collection.find(filter, {
      // @ts-ignore
      noCursorTimeout: false,
      ...options,
    }).toArray();
  }

  public findOne(filter: FilterDoc, options: FindOptions) {
    return this.collection.findOne(filter, {
      // @ts-ignore
      noCursorTimeout: false,
      ...options,
    });
  }

  public updateOne(filter: FilterDoc, updateValue: Restaurant) {
    return this.collection.updateOne(filter, { $set: updateValue });
  }

  public deleteOne(filter: FilterDoc): Promise<number> {
    return this.collection.deleteOne(filter);
  }
}

export default RestaurantService;
