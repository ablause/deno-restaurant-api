import { Bson, Collection } from "mongo/mod.ts";

import database from "../utilities/database.ts";

abstract class BaseMongoService<T extends { _id?: string }> {
  protected readonly collection: Collection<T>;
  protected readonly projection: string[];

  protected readonly index = "_id";

  constructor(
    { collection, projection }: { collection: string; projection: string[] },
  ) {
    this.collection = database.collection<T>(collection);
    this.projection = projection;
  }

  public async getAll(limit: number, page: number) {
    const cursor = this.collection.find(undefined, {
      projection: this.projection,
      noCursorTimeout: false,
      skip: limit * page,
      limit,
    });

    const results = await cursor.toArray();

    return results;
  }

  public async getByIndex(index: string) {
    const result = await this.collection.findOne({
      [this.index]: new Bson.ObjectId(index),
    }, {
      projection: this.projection,
      noCursorTimeout: false,
    });

    return result;
  }

  public async create(document: T) {
    const result = await this.collection.insertOne(document);

    return { _id: result, ...document };
  }

  public async updateByIndex(index: string, document: Partial<T>) {
    // Remove Partial<TDocument> in lib
    const { modifiedCount } = await this.collection.updateOne({
      [this.index]: new Bson.ObjectId(index),
    }, {
      $set: document,
    });

    return Boolean(modifiedCount);
  }

  public async deleteByIndex(index: string) {
    const deleted = await this.collection.deleteOne({
      [this.index]: new Bson.ObjectId(index),
    });

    return Boolean(deleted);
  }

  public async countByIndex(index: string) {
    const result = await this.collection.countDocuments({
      [this.index]: new Bson.ObjectId(index),
    });

    return result;
  }
}

export default BaseMongoService;
