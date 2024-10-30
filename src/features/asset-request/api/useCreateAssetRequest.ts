"use client";

import useAxios from "@/hooks/useAxios";
import { ErrorResponse } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AssetRequest } from "../types";

interface Payload extends Pick<AssetRequest, "assignToUser"> {
  items: { id: number; qty: number }[];
}

export const useCreateAssetRequestMutation = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      return await axiosInstance.post("/asset-requests", payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["infinite-asset-requests"],
      });
      toast.success("Create Asset Request success");
      router.push("/");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message);
    },
  });
};
