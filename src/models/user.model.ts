import { z } from "zod/mod.ts";

const userSchema = z.object({
  username: z.string(),
  password: z.string(),
  // service: z.string(),
  roles: z.array(z.string()).optional(),
  ref: z.string().nullable(),
});

export type User = z.infer<typeof userSchema>;

export { userSchema };
