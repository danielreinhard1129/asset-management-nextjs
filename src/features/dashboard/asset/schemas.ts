import { z } from "zod";
import { Status } from "./types";

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

export const UpdateAssetSchema = z.object({
  name: z.string().min(3),
  categoryId: z.string().min(1),
  serial: z.string().min(1),
  purchaseDate: z.date(),
  status: z.enum([
    Status.AVAILABLE,
    Status.IN_PROGRESS,
    Status.IN_USE,
    Status.MAINTENANCE,
    Status.RETIRED,
    Status.MISSING,
    Status.BROKEN,
  ]),
  purchasePrice: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Purchase Price must be a valid number")
    .optional(),
  image: z.instanceof(File).optional(),
});

export type CreateAssetSchemaType = z.infer<typeof CreateAssetSchema>;
export type UpdateAssetSchemaType = z.infer<typeof UpdateAssetSchema>;
