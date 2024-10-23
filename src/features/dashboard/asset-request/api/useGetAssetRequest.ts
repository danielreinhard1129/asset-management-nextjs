"use client";

import { AssetRequest } from "@/features/asset-request/types";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const useGetAssetRequest = (id: number) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["asset-request", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<AssetRequest>(
        `/asset-requests/${id}`
      );
      return data;
    },
  });
};

export default useGetAssetRequest;
