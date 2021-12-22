import { z } from "zod/mod.ts";
import { Bson } from "mongo/mod.ts";

const objectId = z.instanceof(Bson.ObjectId)
  .refine((v) => Bson.ObjectId.isValid(v), { message: "ObjectId is invalid" });

export default objectId;
