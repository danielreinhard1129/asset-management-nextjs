import useAxios from "@/hooks/useAxios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Asset } from "../types";

interface GetAssetsQuery extends PaginationQueries {
  search?: string;
  myAsset?: boolean;
}

export const useGetInfiniteAssets = (queries: GetAssetsQuery) => {
  const { axiosInstance } = useAxios();

  return useInfiniteQuery({
    queryKey: ["infinite-assets", queries],
    queryFn: async ({ pageParam }) => {
      const { data } = await axiosInstance.get<PageableResponse<Asset>>(
        "/assets",
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
