import { z } from "https://deno.land/x/zod@v3.0.0-alpha.33/mod.ts";

enum MediaTypeEnum {
  "image/png",
  "image/jpg",
  "image/svg",
}

const mediaSchema = z.object({
  href: z.string(),
  type: z.nativeEnum(MediaTypeEnum),
});

type Media = z.infer<typeof mediaSchema>;

export { mediaSchema };
export type { Media };
