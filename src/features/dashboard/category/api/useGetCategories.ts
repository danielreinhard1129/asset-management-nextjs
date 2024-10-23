"use client";

import useAxios from "@/hooks/useAxios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import { Category } from "../../asset-category/types";

interface CategoriesQueries extends PaginationQueries {
  search?: string;
}

const useGetCategories = (queries: CategoriesQueries) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["categories", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Category>>(
        "/categories",
        { params: queries }
      );

      return data;
    },
  });
};

export default useGetCategories;
