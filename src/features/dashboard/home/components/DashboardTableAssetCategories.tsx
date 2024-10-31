"use client";

import { Box, Flex, Pagination, Table } from "@mantine/core";
import { useState } from "react";
import useGetCategories from "../../category/api/useGetCategories";
import { format } from "date-fns";
import DashboardLoader from "@/components/DashboardLoader";
import DashboardEmpty from "@/components/DashboardEmpty";

const DashboardTableAssetCategories = () => {
  const [page, setPage] = useState(1);
  const { data: categories, isPending } = useGetCategories({ page, take: 3 });

  const onChangePage = (value: number) => {
    setPage(value);
  };

  if (isPending) {
    return <DashboardLoader h="20.3vh" />;
  }

  if (!categories) {
    return <DashboardEmpty message="No Data" h="20.3vh" />;
  }
  const rows = categories.data.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{format(element.createdAt, "dd MMM yyyy")}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Box p="sm" style={{ border: "1px solid lightgray", borderRadius: "10px" }}>
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Flex justify="end" mt="xs">
        <Pagination
          total={Math.ceil(categories.meta.total / categories.meta.perPage)}
          value={page}
          onChange={onChangePage}
          disabled={isPending}
          size="sm"
        />
      </Flex>
    </Box>
  );
};

export default DashboardTableAssetCategories;
