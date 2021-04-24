import { z } from "https://deno.land/x/zod@v3.0.0-alpha.33/mod.ts";
import { mediaSchema } from "./media.model.ts";
import { sectionSchema } from "./section.model.ts";
import { itemSchema } from "./items.model.ts";

const restaurantSchema = z.object({
  name: z.string(),
  title: z.string(),
  description: z.string().optional(),
  medias: z.array(mediaSchema).optional(),
  sections: z.array(sectionSchema).optional(),
  items: z.array(itemSchema).optional(),
});

type Restaurant = z.infer<typeof restaurantSchema>;

export { restaurantSchema };
export type { Restaurant };
