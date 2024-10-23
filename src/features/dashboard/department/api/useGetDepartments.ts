"use client";

import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import { Department } from "../types";
import useAxios from "@/hooks/useAxios";

interface DepartmentsQueries extends PaginationQueries {
  search?: string;
  address?: string;
}

const useGetDepartments = (queries: DepartmentsQueries) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["departments", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Department>>(
        "/departments",
        { params: queries }
      );

      return data;
    },
  });
};

export default useGetDepartments;
