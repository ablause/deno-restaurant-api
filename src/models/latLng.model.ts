import { z } from "zod/mod.ts";

const regex = new RegExp(
  /^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/,
);

const latLngSchema = z.object({
  latitude: z.string().regex(regex),
  longitude: z.string().regex(regex),
});

export { latLngSchema };
