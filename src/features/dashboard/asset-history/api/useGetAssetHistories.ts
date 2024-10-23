"use client";

import useAxios from "@/hooks/useAxios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import { AssetHistory } from "../types";

interface AssetHistoriesQueries extends PaginationQueries {
  search?: string;
}

const useGetAssetHistories = (queries: AssetHistoriesQueries) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["asset-histories", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<AssetHistory>>(
        "/asset-histories",
        { params: queries }
      );

      return data;
    },
  });
};

export default useGetAssetHistories;
