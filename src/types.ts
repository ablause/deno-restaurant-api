import { Bson } from "https://deno.land/x/mongo@v0.22.0/mod.ts";

export interface BaseDocument extends Bson.Document {
  readonly _id: { $oid: string } | Bson.ObjectID;
}

export type Query = {
  fields?: string[];
  offset?: number;
  limit?: number;
  [key: string]: any;
};
