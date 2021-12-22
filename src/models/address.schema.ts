import { z } from "zod/mod.ts";
import { latLngSchema } from "./latLng.model.ts";

const addressSchema = z.object({
  city: z.string(),
  number: z.string(),
  postcode: z.string(),
  formatted: z.string().optional(),
  comment: z.string().optional(),
  latLng: latLngSchema,
});

export default addressSchema;
