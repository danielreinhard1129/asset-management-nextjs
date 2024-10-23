"use client";

import useQueryString from "@/hooks/useQueryString";
import { useDebouncedValue } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import useGetDepartments from "../api/useGetDepartments";

const useDisplay = (page: string | undefined, search: string | undefined) => {
  const [searchValue, setSearchValue] = useState(search);
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [location, setLocation] = useState<string>("");
  const [debouncedSearch] = useDebouncedValue(searchValue, 500);

  const { data: departments, isPending } = useGetDepartments({
    page: searchValue ? 1 : parseInt(page!) || 1,
    search: debouncedSearch,
    address: location,
    sortOrder,
    sortBy,
  });

  const router = useRouter();

  const { createQueryString } = useQueryString();

  const onChangePage = (value: number) => {
    const page = createQueryString("page", String(value));
    router.push(`?${page}`);
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const search = createQueryString("search", e.target.value);
    router.replace(`?${search}`);
  };

  return {
    departments,
    isPending,
    searchValue,
    setSortBy,
    setLocation,
    setSortOrder,
    onChangePage,
    onChangeInput,
  };
};

export default useDisplay;
