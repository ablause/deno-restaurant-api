import {
  Body,
  helpers,
  RouterContext,
} from "https://deno.land/x/oak@v7.3.0/mod.ts";
import type { Query } from "../types.ts";
import database from "./database.ts";

export interface Options {
  collection: string;
  params?: { [key: string]: string };
}

abstract class BaseController<T> {
  protected collection: ReturnType<typeof database["collection"]>;
  protected params: { [key: string]: string };

  constructor({ collection, params = { id: "id" } }: Options) {
    this.collection = database.collection<T>(collection);
    this.params = params;
  }

  protected getParsedQuery(context: RouterContext<Query>): Query {
    const { fields, offset = 0, limit = 10, ...params } = helpers.getQuery(
      context,
      {
        mergeParams: true,
      },
    );

    return {
      limit: Number(limit),
      offset: Number(offset),
      fields: fields?.split(","),
      ...params,
    };
  }

  protected sanitize(body: Body | any): Body {
    return body;
  }
}

export default BaseController;
