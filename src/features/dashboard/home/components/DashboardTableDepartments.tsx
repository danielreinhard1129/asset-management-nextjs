"use client";

import DashboardEmpty from "@/components/DashboardEmpty";
import DashboardLoader from "@/components/DashboardLoader";
import { Box, Flex, Pagination, Table } from "@mantine/core";
import { useState } from "react";
import useGetDepartments from "../../department/api/useGetDepartments";

const DashboardTableDepartments = () => {
  const [page, setPage] = useState(1);
  const { data: departments, isPending } = useGetDepartments({ page, take: 3 });

  const onChangePage = (value: number) => {
    setPage(value);
  };

  if (isPending) {
    return <DashboardLoader h="20.3vh" />;
  }

  if (!departments) {
    return <DashboardEmpty message="No Data" h="20.3vh" />;
  }

  const rows = departments.data.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.address}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Box p="sm" style={{ border: "1px solid lightgray", borderRadius: "10px" }}>
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Department</Table.Th>
            <Table.Th>Location</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Flex justify="end" mt="xs">
        <Pagination
          total={Math.ceil(departments.meta.total / departments.meta.perPage)}
          value={page}
          onChange={onChangePage}
          disabled={isPending}
          size="sm"
        />
      </Flex>
    </Box>
  );
};

export default DashboardTableDepartments;
