"use client";

import useAxios from "@/hooks/useAxios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import { Status } from "../types";
import { Asset } from "@/features/asset/types";

interface AssetsQueries extends PaginationQueries {
  search?: string;
  status?: Status;
  myAsset?: boolean;
}

const useGetAssets = (queries: AssetsQueries) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["assets", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Asset>>(
        "/assets",
        { params: queries }
      );

      return data;
    },
  });
};

export default useGetAssets;
