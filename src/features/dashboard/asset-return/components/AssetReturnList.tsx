"use client";

import TableSkeleton from "@/components/TableSkeleton";
import { AssetReturned } from "@/features/asset-return/types";
import { Pagination, Stack } from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { ChangeEvent, useState } from "react";
import useGetAssetReturned from "../api/useGetAssetReturned";
import AssetReturnHeader from "./AssetReturnHeader";
import AssetReturnTable from "./AssetReturnTable";
import ModalAssetReturn from "./ModalAssetReturn";

const AssetReturnList = () => {
  const [page, setPage] = useState<number>(1);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchDebounced] = useDebouncedValue(searchInput, 250);
  const [opened, { open, close }] = useDisclosure(false);

  const [selectedAssetReturn, setSelectedAssetReturn] =
    useState<AssetReturned | null>(null);

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
    <>
      <Stack>
        <AssetReturnHeader search={searchInput} onChangeInput={onChangeInput} />
        {isPending && <TableSkeleton cols={5} height={30} />}
        {assetRetuned && (
          <>
            <AssetReturnTable
              assetReturned={assetRetuned.data}
              setSelectedAssetReturn={setSelectedAssetReturn}
              openModalAssetReturnDetail={open}
            />
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
      <ModalAssetReturn
        opened={opened}
        close={close}
        selectedAssetReturn={selectedAssetReturn}
      />
    </>
  );
};

export default AssetReturnList;
