"use client";

import useAxios from "@/hooks/useAxios";
import { ErrorResponse } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const useDeleteAccount = () => {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.delete<{ message: string }>(
        `/accounts/${id}`
      );
      return data;
    },
    onSuccess: async ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["info-resources"] });
      toast.success(message || "Delete account success");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useDeleteAccount;
