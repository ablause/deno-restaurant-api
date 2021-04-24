import { z } from "https://deno.land/x/zod@v3.0.0-alpha.33/mod.ts";
import { mediaSchema } from "./media.model.ts";

const itemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  available: z.boolean().optional(),
  medias: z.array(mediaSchema),
  price: z.number().positive(),
});

type Item = z.infer<typeof itemSchema>;

export { itemSchema };
export type { Item };
