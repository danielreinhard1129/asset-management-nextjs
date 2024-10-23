"use client";

import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Asset } from "../types";

export const useGetAsset = (id: number) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["asset", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Asset>(`/assets/${id}`);

      return data;
    },
    retry: false,
  });
};
