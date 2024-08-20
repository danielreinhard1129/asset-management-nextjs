"use server";

import { axiosInstance } from "@/lib/axios";
import { actionClient } from "@/lib/safe-action";
import { LoginSchema } from "./schemas";
import { LoginPayload } from "./types";

export const loginAction = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput }) => {
    const { data } = await axiosInstance.post<LoginPayload>(
      "/auth/login",
      parsedInput
    );
    return data;
  });
