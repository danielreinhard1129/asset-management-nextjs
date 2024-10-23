"use client";

import { AssetRequest } from "@/features/asset-request/types";
import useAxios from "@/hooks/useAxios";
import { ErrorResponse } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Payload {
  bastItems: { assetId: number }[];
  assetRequestId: number;
}

const useAssignAsset = () => {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await axiosInstance.post<{ message: string }>(
        `/asset-requests/assign`,
        payload
      );
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["asset-requests"] });
      toast.success("Assign Asset success");
      router.push("/dashboard/asset-requests");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useAssignAsset;
