"use client";

import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { InfoResources } from "../types";

const useGetInfoResources = () => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["info-resources"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<InfoResources>(
        "/info/resources"
      );

      return data;
    },
  });
};

export default useGetInfoResources;
