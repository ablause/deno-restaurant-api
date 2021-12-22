import { z } from "zod/mod.ts";

const contactSchema = z.object({
  phone: z.string(),
  email: z.string(),
});

export { contactSchema };
