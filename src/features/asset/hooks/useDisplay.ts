"use client";

import { ChangeEvent, useState } from "react";
import useGetAssets from "../api/useGetAssets";
import { useDebouncedValue } from "@mantine/hooks";

const useDisplay = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const { data: assets, isPending } = useGetAssets({
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
    assets,
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
