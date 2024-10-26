"use client";

import { ChangeEvent, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import useGetCategories from "../../category/api/useGetCategories";

const useDisplay = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const { data: categories, isPending } = useGetCategories({
    page,
    search: debouncedSearch,
    take: 5,
    sortOrder,
  });

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const onChangePage = (value: number) => {
    setPage(value);
  };

  return {
    categories,
    page,
    search,
    isPending,
    setPage,
    setSearch,
    setSortOrder,
    onChangeInput,
    onChangePage,
  };
};

export default useDisplay;
