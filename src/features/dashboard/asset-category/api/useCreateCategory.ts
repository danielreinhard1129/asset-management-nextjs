"use client";

import useAxios from "@/hooks/useAxios";
import { ErrorResponse } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Payload {
  name: string;
  image: File;
}

export const useCreateCategory = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const createAssetForm = new FormData();

      const { name, image } = payload;

      createAssetForm.append("name", name);
      createAssetForm.append("categoryPhoto", image);

      return await axiosInstance.post("/categories", createAssetForm);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Create Asset Category success");
      router.push("/dashboard/asset-categories");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message);
    },
  });
};
