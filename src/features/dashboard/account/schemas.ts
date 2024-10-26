import { Role } from "@/features/user/types";
import { z } from "zod";

export const CreateAccountSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  role: z.nativeEnum(Role),
  password: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value ||
        (value.length >= 6 &&
          value.length <= 20 &&
          /[A-Z]/.test(value) &&
          /[0-9]/.test(value)),
      {
        message:
          "Password must be 6-20 characters long, contain at least one uppercase letter and one number, if provided",
      }
    ),
  departmentId: z.string().min(1),
});
export const UpdateAccountSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  role: z.nativeEnum(Role).optional(),
  password: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value ||
        (value.length >= 6 &&
          value.length <= 20 &&
          /[A-Z]/.test(value) &&
          /[0-9]/.test(value)),
      {
        message:
          "Password must be 6-20 characters long, contain at least one uppercase letter and one number, if provided",
      }
    ),
  departmentId: z.string().min(1).optional(),
});

export type CreateAccountSchemaType = z.infer<typeof CreateAccountSchema>;
export type UpdateAccountSchemaType = z.infer<typeof UpdateAccountSchema>;
