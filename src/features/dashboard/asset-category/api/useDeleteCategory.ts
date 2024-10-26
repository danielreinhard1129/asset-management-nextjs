"use client";

import useAxios from "@/hooks/useAxios";
import { ErrorResponse } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useDeleteCategory = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.delete<{ message: string }>(
        `/categories/${id}`
      );
      return data;
    },
    onSuccess: async ({ message }) => {
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(message || "Delete success");
      router.push("/dashboard/asset-categories");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useDeleteCategory;
