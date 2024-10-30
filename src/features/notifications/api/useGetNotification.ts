"use client";

import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Notification } from "../types";

export const useGetNotification = (id: number) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["notifications", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Notification>(
        `/notifications/${id}`
      );

      return data;
    },
    retry: false,
  });
};
