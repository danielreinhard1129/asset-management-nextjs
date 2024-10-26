"use client";

import { User } from "@/features/user/types";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const useGetAccount = (id: number) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["account", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<User>(`/accounts/${id}`);
      return data;
    },
  });
};

export default useGetAccount;
