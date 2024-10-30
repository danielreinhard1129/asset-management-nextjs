"use client";

import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { TotalPendingRequests } from "../types";

const useGetInfoPendingRequests = () => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["info-pending-requests"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<TotalPendingRequests>(
        "/info/pending-requests"
      );

      return data;
    },
  });
};

export default useGetInfoPendingRequests;
