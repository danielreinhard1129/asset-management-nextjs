"use client";

import useAxios from "@/hooks/useAxios";
import { PageableResponse } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

export const useGetUnreadNotifications = () => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["unread-notifications"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<number>>(
        "/notifications/unread"
      );

      return data;
    },
    retry: false,
  });
};
