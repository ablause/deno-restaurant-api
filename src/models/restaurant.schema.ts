import { z } from "zod/mod.ts";
import mongoSchema from "./mongo.schema.ts";
import addressSchema from "./address.schema.ts";
import sectionSchema from "./section.schema.ts";
import itemSchema from "./item.schema.ts";

const restaurantSchema = mongoSchema.extend({
  name: z.string(),
  title: z.string(),
  description: z.string().optional(),
  address: addressSchema.optional(),
  sections: z.array(sectionSchema).optional(),
  items: z.array(itemSchema).optional(),
});

export type Restaurant = z.infer<typeof restaurantSchema>;

export default restaurantSchema;
