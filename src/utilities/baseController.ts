import {
  Body,
  helpers,
  RouterContext,
} from "https://deno.land/x/oak@v7.3.0/mod.ts";
import { Status, STATUS_TEXT } from "https://deno.land/std@0.94.0/http/mod.ts";
import type { Query } from "../types.ts";

export interface Options {
  params?: { [key: string]: string };
}

abstract class BaseController {
  protected params: { [key: string]: string };

  constructor({ params = { id: "id" } }: Options) {
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
