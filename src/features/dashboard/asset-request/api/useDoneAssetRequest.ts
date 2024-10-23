"use client";

import useAxios from "@/hooks/useAxios";
import { ErrorResponse } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const useDoneAssetRequest = (id: number) => {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.patch<{ message: string }>(
        `/asset-requests/${id}/done`
      );
      return data;
    },
    onSuccess: async ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["infinite-asset-requests"] });
      queryClient.invalidateQueries({ queryKey: ["asset-requests"] });
      queryClient.invalidateQueries({ queryKey: ["asset-request"] });
      queryClient.invalidateQueries({ queryKey: ["asset-histories"] });
      queryClient.invalidateQueries({
        queryKey: ["info-total-asset-by-status"],
      });
      toast.success(message || "Success");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useDoneAssetRequest;
