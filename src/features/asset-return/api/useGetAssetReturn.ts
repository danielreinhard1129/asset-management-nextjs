"use client";

import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { AssetReturned } from "../types";

const useGetAssetReturn = (id: number) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["asset-return", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<AssetReturned>(
        `/asset-returned/${id}`
      );
      return data;
    },
  });
};

export default useGetAssetReturn;
