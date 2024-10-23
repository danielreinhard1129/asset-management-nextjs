"use client";

import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { TotalAssetByStatus } from "../types";

const useGetInfoTotalAssetByStatus = () => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["info-total-asset-by-status"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<TotalAssetByStatus[]>(
        "/info/asset-by-status"
      );

      return data;
    },
  });
};

export default useGetInfoTotalAssetByStatus;
