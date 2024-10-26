"use client";

import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Category } from "../types";

const useGetCategory = (id: number) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Category>(`/categories/${id}`);
      return data;
    },
  });
};

export default useGetCategory;
