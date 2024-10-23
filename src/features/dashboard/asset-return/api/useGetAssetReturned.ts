"use client";

import { AssetReturned } from "@/features/asset-return/types";
import useAxios from "@/hooks/useAxios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface AssetReturnedQueries extends PaginationQueries {
  search?: string;
  myReturn?: boolean;
}

const useGetAssetReturned = (queries: AssetReturnedQueries) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["asset-returned", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<AssetReturned>>(
        "/asset-returned",
        { params: queries }
      );

      return data;
    },
  });
};

export default useGetAssetReturned;
