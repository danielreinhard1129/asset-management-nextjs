"use client";

import { Box, Flex, Pagination, Table } from "@mantine/core";
import { format } from "date-fns";
import { useState } from "react";
import useGetAssetHistories from "../../asset-history/api/useGetAssetHistories";
import DashboardLoader from "@/components/DashboardLoader";
import DashboardEmpty from "@/components/DashboardEmpty";

const DashboardTableRecentActivity = () => {
  const [page, setPage] = useState(1);
  const { data: assetHistories, isPending } = useGetAssetHistories({
    page,
    take: 5,
  });

  const onChangePage = (value: number) => {
    setPage(value);
  };

  if (isPending) {
    return <DashboardLoader h="27.2vh" />;
  }

  if (!assetHistories) {
    return <DashboardEmpty message="No Data" h="27.2vh" />;
  }

  const rows = assetHistories.data.map((assetHistory) => (
    <Table.Tr key={assetHistory.id}>
      <Table.Td>{format(assetHistory.createdAt, "dd MMM yyyy")}</Table.Td>
      <Table.Td>{assetHistory.asset.name}</Table.Td>
      <Table.Td>{assetHistory.type}</Table.Td>
      <Table.Td>
        {`${assetHistory.admin.firstName} ${assetHistory.admin.lastName}`}
      </Table.Td>
      <Table.Td>
        {assetHistory.userId
          ? `${assetHistory.user?.firstName} ${assetHistory.user?.lastName}`
          : "-"}
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <Box p="sm" style={{ border: "1px solid lightgray", borderRadius: "10px" }}>
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>Asset</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Admin</Table.Th>
            <Table.Th>Manager</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Flex justify="end" mt="xs">
        <Pagination
          total={Math.ceil(
            assetHistories.meta.total / assetHistories.meta.perPage
          )}
          value={page}
          onChange={onChangePage}
          disabled={isPending}
          size="sm"
        />
      </Flex>
    </Box>
  );
};

export default DashboardTableRecentActivity;
