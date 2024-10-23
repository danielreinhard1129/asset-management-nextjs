"use client";

import TableSkeleton from "@/components/TableSkeleton";
import { Pagination, Stack } from "@mantine/core";
import useDisplay from "../hooks/useDisplay";
import AssetHeader from "./AssetHeader";
import AssetTable from "./AssetTable";

const AssetList = () => {
  const { assets, page, search, isPending, onChangePage, onChangeInput } =
    useDisplay();

  return (
    <Stack>
      <AssetHeader
        search={search}
        onChangeInput={onChangeInput}
        // setSortOrder={setSortOrder}
        // setLocation={setLocation}
      />
      {isPending && <TableSkeleton cols={6} height={60} />}
      {assets && (
        <>
          <AssetTable assets={assets.data} />
          <Pagination
            style={{ display: "flex", justifyContent: "end" }}
            total={Math.ceil(assets.meta.total / assets.meta.perPage)}
            value={page || 1}
            onChange={onChangePage}
            disabled={isPending}
          />
        </>
      )}
    </Stack>
  );
};

export default AssetList;
