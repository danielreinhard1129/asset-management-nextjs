"use client";

import { Pagination, Stack } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { ChangeEvent, useState } from "react";
import useGetAssetReturned from "../api/useGetAssetReturned";
import AssetReturnHeader from "./AssetReturnHeader";
import AssetReturnTable from "./AssetReturnTable";
import TableSkeleton from "@/components/TableSkeleton";

const AssetReturnList = () => {
  const [page, setPage] = useState<number>(1);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchDebounced] = useDebouncedValue(searchInput, 250);

  const { data: assetRetuned, isPending } = useGetAssetReturned({
    search: searchDebounced,
    page,
  });

  const onChangePage = (value: number) => {
    setPage(value);
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  return (
    <Stack>
      <AssetReturnHeader search={searchInput} onChangeInput={onChangeInput} />
      {isPending && <TableSkeleton cols={5} height={30} />}
      {assetRetuned && (
        <>
          <AssetReturnTable assetReturned={assetRetuned.data} />
          <Pagination
            style={{ display: "flex", justifyContent: "end" }}
            total={Math.ceil(
              assetRetuned.meta.total / assetRetuned.meta.perPage
            )}
            value={page || 1}
            onChange={onChangePage}
            disabled={isPending}
          />
        </>
      )}
    </Stack>
  );
};

export default AssetReturnList;
