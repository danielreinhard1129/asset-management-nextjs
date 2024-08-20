import { Flex, Table, Title } from "@mantine/core";
import { FC } from "react";

interface TableDataEmptyProps {
  colSpan: number;
}

const TableDataEmpty: FC<TableDataEmptyProps> = ({ colSpan }) => {
  return (
    <Table.Tr>
      <Table.Td colSpan={colSpan}>
        <Flex justify="center" align="center" h="400px">
          <Title size="h4">No Data</Title>
        </Flex>
      </Table.Td>
    </Table.Tr>
  );
};

export default TableDataEmpty;
