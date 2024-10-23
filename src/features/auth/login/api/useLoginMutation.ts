"use client";

import useAxios from "@/hooks/useAxios";
import { ErrorResponse } from "@/types/error";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { Login } from "../types";
import { useRouter } from "next/navigation";

const useLoginMutation = () => {
  const { axiosInstance } = useAxios();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: Login) => {
      return await axiosInstance.post("/auth/login", payload);
    },
    onSuccess: async (data) => {
      await signIn("credentials", { ...data.data, redirect: false });
      toast.success("Login success");
      router.replace(data.data.role !== "USER" ? "/dashboard" : "/");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useLoginMutation;
