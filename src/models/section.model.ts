import { z } from "https://deno.land/x/zod@v3.0.0-alpha.33/mod.ts";

export interface ISection {
  id: string;
  title: string;
  property: number;
  description?: string;
  subSections?: ISection[];
}

const sectionSchema: z.ZodSchema<ISection> = z.lazy(() =>
  z.object({
    id: z.string(),
    title: z.string(),
    property: z.number().nonnegative(),
    description: z.string().optional(),
    subSections: z.array(sectionSchema).optional(),
  })
);

type Section = z.infer<typeof sectionSchema>;

export { sectionSchema };
export type { Section };
