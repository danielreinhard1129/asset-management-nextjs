"use client";

import useAxios from "@/hooks/useAxios";
import { ErrorResponse } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const useDeleteAsset = () => {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.delete<{ message: string }>(
        `/assets/${id}`
      );
      return data;
    },
    onSuccess: async ({ message }) => {
      await queryClient.invalidateQueries({ queryKey: ["assets"] });
      toast.success(message || "Delete asset success");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useDeleteAsset;
