import useAxios from "@/hooks/useAxios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Notification } from "../types";

interface GetNotificationsQuery extends PaginationQueries {
  search?: string;
}

export const useGetInfiniteNotifications = (queries: GetNotificationsQuery) => {
  const { axiosInstance } = useAxios();

  return useInfiniteQuery({
    queryKey: ["infinite-notifications", queries],
    queryFn: async ({ pageParam }) => {
      const { data } = await axiosInstance.get<PageableResponse<Notification>>(
        "/notifications",
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
