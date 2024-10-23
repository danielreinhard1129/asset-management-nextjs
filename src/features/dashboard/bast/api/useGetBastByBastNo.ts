"use client";

import { Bast } from "@/features/bast/types";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const useGetBastByBastNo = (bastNo: string) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["bast", bastNo],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Bast>(`/bast/${bastNo}`);
      return data;
    },
  });
};

export default useGetBastByBastNo;
