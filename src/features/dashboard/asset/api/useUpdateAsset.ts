"use client";

import { Asset } from "@/features/asset/types";
import useAxios from "@/hooks/useAxios";
import { ErrorResponse } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Payload
  extends Omit<Asset, "image" | "categoryId" | "purchasePrice"> {
  image: File;
  categoryId: string;
  purchasePrice: string;
}

const useUpdateAsset = (id: number) => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<Payload>) => {
      const upadteAssetForm = new FormData();

      const {
        name,
        categoryId,
        serial,
        purchaseDate,
        purchasePrice,
        image,
        status,
      } = payload;

      if (name) {
        upadteAssetForm.append("name", name);
      }

      if (categoryId) {
        upadteAssetForm.append("categoryId", categoryId.toString());
      }

      if (serial) {
        upadteAssetForm.append("serial", serial);
      }

      if (purchaseDate) {
        upadteAssetForm.append("purchaseDate", purchaseDate.toISOString());
      }

      if (purchasePrice) {
        upadteAssetForm.append("purchasePrice", purchasePrice.toString());
      }

      if (image) {
        upadteAssetForm.append("assetPhoto", image);
      }

      if (status) {
        upadteAssetForm.append("status", status);
      }

      const { data } = await axiosInstance.patch(
        `/assets/${id}`,
        upadteAssetForm
      );
      return data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["asset"] });
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      queryClient.invalidateQueries({ queryKey: ["asset-histories"] });
      toast.success("Update asset success");
      router.push("/dashboard/assets");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useUpdateAsset;
