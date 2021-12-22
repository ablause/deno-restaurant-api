import { z } from "zod/mod.ts";
import objectId from "./objectId.schema.ts";

const mongoSchema = z.object({
  _id: objectId,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export default mongoSchema;
