import { z } from "zod/mod.ts";

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

export type Section = z.infer<typeof sectionSchema>;

export default sectionSchema;
