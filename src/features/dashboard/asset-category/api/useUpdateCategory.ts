"use client";

import useAxios from "@/hooks/useAxios";
import { ErrorResponse } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Category } from "../types";

interface Payload extends Omit<Category, "image"> {
  image: File;
}

const useUpdateCategory = (id: number) => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<Payload>) => {
      const updateCategoryForm = new FormData();

      const { name, image } = payload;

      if (name) {
        updateCategoryForm.append("name", name);
      }

      if (image) {
        updateCategoryForm.append("categoryPhoto", image);
      }

      const { data } = await axiosInstance.patch(
        `/categories/${id}`,
        updateCategoryForm
      );

      return data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success("Update asset category success");
      router.push("/dashboard/asset-categories");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useUpdateCategory;
