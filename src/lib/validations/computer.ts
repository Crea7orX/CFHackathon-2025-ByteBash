import { z } from "zod";

export const computerCreateSchema = z.object({
  name: z.string().min(1).max(256),
  apiKey: z.string().min(1).max(256),
});

export type ComputerCreate = z.infer<typeof computerCreateSchema>;

export const computerResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  usage: z.string(),
  battery: z.number(),
  status: z.boolean(),
  ownerId: z.string(),
  createdAt: z.number(),
  updatedAt: z.number().nullable(),
});

export type ComputerResponse = z.infer<typeof computerResponseSchema>;

export const computerStatsSchema = z.object({
  usage: z.string(),
  battery: z.number(),
});

export type ComputerStats = z.infer<typeof computerStatsSchema>;
