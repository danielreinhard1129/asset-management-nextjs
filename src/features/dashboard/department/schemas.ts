import { z } from "zod";

export const CreateDepartmentSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
});

export const UpdateDepartmentSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
});

export type CreateDepartmentSchemaType = z.infer<typeof CreateDepartmentSchema>;
export type UpdateDepartmentSchemaType = z.infer<typeof UpdateDepartmentSchema>;
