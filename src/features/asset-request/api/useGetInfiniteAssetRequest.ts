import useAxios from "@/hooks/useAxios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AssetRequest } from "../types";

interface GetAssetRequestsQuery extends PaginationQueries {
  search?: string;
  myRequest?: boolean;
}

export const useGetInfiniteAssetRequests = (queries: GetAssetRequestsQuery) => {
  const { axiosInstance } = useAxios();

  return useInfiniteQuery({
    queryKey: ["infinite-asset-requests", queries],
    queryFn: async ({ pageParam }) => {
      const { data } = await axiosInstance.get<PageableResponse<AssetRequest>>(
        "/asset-requests",
        { params: { ...queries, page: pageParam } }
      );
      return data;
    },
    getNextPageParam: (response) => {
      if (response.meta.hasNext) {
        return response.meta.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};
