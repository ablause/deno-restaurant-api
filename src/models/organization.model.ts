import { z } from "zod/mod.ts";
import { contactSchema } from "./contact.model.ts";

const organizationSchema = z.object({
  name: z.string(),
  users: z.array(z.string()).optional(),
  restaurants: z.array(z.string()).optional(),
  contact: contactSchema.optional(),
  roles: z.array(z.object({
    name: z.string(),
    permissions: z.array(z.string()),
  })).optional(),
});

export type Organization = z.infer<typeof organizationSchema>;

export { organizationSchema };
