"use client";

import useAxios from "@/hooks/useAxios";
import { ErrorResponse } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Payload {
  items: { assetId: number }[];
}

export const useCreateAssetReturnMutation = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      return await axiosInstance.post("/asset-returned", payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["infinite-asset-returned"],
      });
      toast.success("Create Asset return success");
      router.push("/");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message);
    },
  });
};
