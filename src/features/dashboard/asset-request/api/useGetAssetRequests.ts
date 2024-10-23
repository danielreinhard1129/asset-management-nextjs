"use client";

import { AssetRequest } from "@/features/asset-request/types";
import useAxios from "@/hooks/useAxios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface AssetRequestsQueries extends PaginationQueries {
  search?: string;
  myRequest?: boolean;
}

const useGetAssetRequests = (queries: AssetRequestsQueries) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["asset-requests", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<AssetRequest>>(
        "/asset-requests",
        { params: queries }
      );

      return data;
    },
  });
};

export default useGetAssetRequests;
