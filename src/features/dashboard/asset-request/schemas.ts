import { z } from "zod";

export const AssignAssetSchema = z.object({
  bastItems: z
    .array(
      z.object({
        assetId: z.number().min(1, "ID is required"),
      })
    )
    .min(1, "At least one item is required"),
});

export type AssignAssetSchemaType = z.infer<typeof AssignAssetSchema>;
