"use client";

import TableSkeleton from "@/components/TableSkeleton";
import { Pagination, Stack } from "@mantine/core";
import { FC } from "react";
import useDisplay from "../hooks/useDisplay";
import DepartmentHeader from "./DepartmentHeader";
import DepartmentTable from "./DepartmentTable";

interface DepartmentListProps {
  page: string | undefined;
  search: string | undefined;
}

const DepartmentList: FC<DepartmentListProps> = ({ page, search }) => {
  const {
    departments,
    isPending,
    searchValue,
    setLocation,
    setSortOrder,
    onChangePage,
    onChangeInput,
  } = useDisplay(page, search);

  return (
    <Stack>
      <DepartmentHeader
        search={searchValue}
        onChangeInput={onChangeInput}
        setSortOrder={setSortOrder}
        setLocation={setLocation}
      />
      {isPending && <TableSkeleton cols={3} />}
      {departments && (
        <>
          <DepartmentTable departments={departments.data} />
          <Pagination
            style={{ display: "flex", justifyContent: "end" }}
            total={Math.ceil(departments.meta.total / departments.meta.perPage)}
            value={parseInt(page!) || 1}
            onChange={onChangePage}
            disabled={isPending}
          />
        </>
      )}
    </Stack>
  );
};

export default DepartmentList;
