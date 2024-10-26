"use client";

import TableSkeleton from "@/components/TableSkeleton";
import { Pagination, Stack } from "@mantine/core";
import useDisplay from "../hooks/useDisplay";
import AccountHeader from "./AccountHeader";
import AccountTable from "./AccountTable";

const AccountList = () => {
  const {
    accounts,
    isPending,
    onChangeInput,
    onChangePage,
    page,
    search,
    setSortOrder,
  } = useDisplay();

  return (
    <Stack>
      <AccountHeader
        search={search}
        onChangeInput={onChangeInput}
        setSortOrder={setSortOrder}
      />
      {isPending && <TableSkeleton cols={6} height={60} />}
      {accounts && (
        <>
          <AccountTable accounts={accounts.data} />
          <Pagination
            style={{ display: "flex", justifyContent: "end" }}
            total={Math.ceil(accounts.meta.total / accounts.meta.perPage)}
            value={page || 1}
            onChange={onChangePage}
            disabled={isPending}
          />
        </>
      )}
    </Stack>
  );
};

export default AccountList;
