import * as z from "zod";

export const wordSchema = z.object({
  params: z.object({
    wordId: z.string(),
  }),
});
