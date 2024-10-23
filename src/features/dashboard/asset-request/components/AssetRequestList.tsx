"use client";

import { Pagination, Stack } from "@mantine/core";
import AssetRequestHeader from "./AssetRequestHeader";
import useGetAssetRequests from "../api/useGetAssetRequests";
import { ChangeEvent, useState } from "react";
import AssetRequestsTable from "./AssetRequestTable";
import TableSkeleton from "@/components/TableSkeleton";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import ModalAssetRequest from "./ModalAssetRequest";
import { AssetRequest } from "@/features/asset-request/types";

const AssetRequestList = () => {
  const [page, setPage] = useState<number>(1);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchDebounced] = useDebouncedValue(searchInput, 250);
  const [opened, { open, close }] = useDisclosure(false);

  const [selectedAssetRequest, setSelectedAssetRequest] =
    useState<AssetRequest | null>(null);

  const { data: assetRequests, isPending } = useGetAssetRequests({
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
        <AssetRequestHeader
          search={searchInput}
          onChangeInput={onChangeInput}
        />
        {isPending && <TableSkeleton cols={5} height={40} />}
        {assetRequests && (
          <>
            <AssetRequestsTable
              assetRequests={assetRequests.data}
              setSelectedAssetRequest={setSelectedAssetRequest}
              openModalAssetRequestDetail={open}
            />
            <Pagination
              style={{ display: "flex", justifyContent: "end" }}
              total={Math.ceil(
                assetRequests.meta.total / assetRequests.meta.perPage
              )}
              value={page || 1}
              onChange={onChangePage}
              disabled={isPending}
            />
          </>
        )}
      </Stack>
      <ModalAssetRequest
        opened={opened}
        close={close}
        selectedAssetRequest={selectedAssetRequest}
      />
    </>
  );
};

export default AssetRequestList;
