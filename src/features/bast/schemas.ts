import { z } from "zod";

export const AssetRequestSchema = z.object({
  assignToUser: z.string().min(3),
});

export type AssetRequestSchemaType = z.infer<typeof AssetRequestSchema>;
