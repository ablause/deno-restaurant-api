import { z } from "zod/mod.ts";

const itemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  available: z.boolean().optional(),
  price: z.number().positive(),
});

export type Item = z.infer<typeof itemSchema>;

export default itemSchema;
