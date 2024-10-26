"use client";

import { useDebouncedValue } from "@mantine/hooks";
import { ChangeEvent, useState } from "react";
import useGetAccounts from "../api/useGetAccounts";

const useDisplay = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const { data: accounts, isPending } = useGetAccounts({
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
    accounts,
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
