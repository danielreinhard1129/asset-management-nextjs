"use client";

import { Role } from "@/features/user/types";
import useAxios from "@/hooks/useAxios";
import { ErrorResponse } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Payload {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  password?: string;
  departmentId: number;
}

const useCreateAccount = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await axiosInstance.post("/accounts", payload);
      return data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["info-resources"] });
      toast.success("Create account success");
      router.push("/dashboard/accounts");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useCreateAccount;
