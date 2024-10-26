"use client";

import TableSkeleton from "@/components/TableSkeleton";
import { Pagination, Stack } from "@mantine/core";
import { FC } from "react";
import useDisplay from "../hooks/useDisplay";
import AssetCategoryHeader from "./AssetCategoryHeader";
import AssetCategoryTable from "./AssetCategoryTable";

interface AssetCategoryListProps {}

const AssetCategoryList: FC<AssetCategoryListProps> = () => {
  const {
    page,
    search,
    isPending,
    categories,
    setSortOrder,
    onChangePage,
    onChangeInput,
  } = useDisplay();

  return (
    <Stack>
      <AssetCategoryHeader
        search={search}
        onChangeInput={onChangeInput}
        setSortOrder={setSortOrder}
      />
      {isPending && <TableSkeleton cols={6} height={60} />}
      {categories && (
        <>
          <AssetCategoryTable categories={categories.data} />
          <Pagination
            style={{ display: "flex", justifyContent: "end" }}
            total={Math.ceil(categories.meta.total / categories.meta.perPage)}
            value={page || 1}
            onChange={onChangePage}
            disabled={isPending}
          />
        </>
      )}
    </Stack>
  );
};

export default AssetCategoryList;
