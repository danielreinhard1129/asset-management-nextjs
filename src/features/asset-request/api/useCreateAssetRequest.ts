"use client";

import useAxios from "@/hooks/useAxios";
import { ErrorResponse } from "@/types/error";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { AssetRequest } from "../types";

interface Payload extends Pick<AssetRequest, "assignToUser"> {
  items: { id: number; qty: number }[];
}

export const useCreateAssetRequestMutation = () => {
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      return await axiosInstance.post("/asset-requests", payload);
    },
    onSuccess: async () => {
      toast.success("Create Asset Request success");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message);
    },
  });
};
