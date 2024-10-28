"use client";

import useAxios from "@/hooks/useAxios";
import { ErrorResponse } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Payload {
  name: string;
  categoryId: string;
  serial: string;
  purchaseDate: Date;
  purchasePrice: string;
  image: File;
}

export const useCreateAsset = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const createAssetForm = new FormData();

      const { name, categoryId, serial, purchaseDate, purchasePrice, image } =
        payload;

      createAssetForm.append("name", name);
      createAssetForm.append("categoryId", categoryId);
      createAssetForm.append("serial", serial);
      createAssetForm.append("purchaseDate", purchaseDate.toISOString());
      createAssetForm.append("purchasePrice", purchasePrice);
      createAssetForm.append("assetPhoto", image);

      return await axiosInstance.post("/assets", createAssetForm);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      queryClient.invalidateQueries({ queryKey: ["asset-histories"] });
      queryClient.invalidateQueries({
        queryKey: ["info-total-asset-by-status"],
      });
      toast.success("Create Asset success");
      router.push("/dashboard/assets");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message);
    },
  });
};
