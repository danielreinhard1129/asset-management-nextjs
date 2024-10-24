import { z } from "zod";

export const CreateAssetSchema = z.object({
  name: z.string().min(3),
  categoryId: z.string().min(1),
  serial: z.string().min(1),
  purchaseDate: z.date(),
  purchasePrice: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Purchase Price must be a valid number"), // Add regex for decimal validation
  image: z.instanceof(File),
});

export type CreateAssetSchemaType = z.infer<typeof CreateAssetSchema>;
