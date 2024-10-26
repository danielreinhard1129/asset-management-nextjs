import { z } from "zod";

export const CreateAssetCategorySchema = z.object({
  name: z.string().min(3),
  image: z.instanceof(File),
});

export const UpdateAssetCategorySchema = z.object({
  name: z.string().min(3),
  image: z.instanceof(File).optional(),
});

export type CreateAssetCategorySchemaType = z.infer<
  typeof CreateAssetCategorySchema
>;

export type UpdateAssetCategorySchemaType = z.infer<
  typeof CreateAssetCategorySchema
>;
