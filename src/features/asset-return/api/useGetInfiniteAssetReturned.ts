import useAxios from "@/hooks/useAxios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AssetReturned } from "../types";

interface GetAssetReturnedQuery extends PaginationQueries {
  search?: string;
  myReturn?: boolean;
}

export const useGetInfiniteAssetReturned = (queries: GetAssetReturnedQuery) => {
  const { axiosInstance } = useAxios();

  return useInfiniteQuery({
    queryKey: ["infinite-asset-returned", queries],
    queryFn: async ({ pageParam }) => {
      const { data } = await axiosInstance.get<PageableResponse<AssetReturned>>(
        "/asset-returned",
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
