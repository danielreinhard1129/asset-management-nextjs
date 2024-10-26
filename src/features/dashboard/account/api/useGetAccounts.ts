"use client";

import { User } from "@/features/user/types";
import useAxios from "@/hooks/useAxios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface AccountsQueries extends PaginationQueries {
  search?: string;
}

const useGetAccounts = (queries: AccountsQueries) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["accounts", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<User>>(
        "/accounts",
        { params: queries }
      );

      return data;
    },
  });
};

export default useGetAccounts;
