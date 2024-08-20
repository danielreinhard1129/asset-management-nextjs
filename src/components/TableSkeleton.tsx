import { Skeleton, Table } from "@mantine/core";
import { FC } from "react";

interface TableSkeletonProps {
  cols: number;
  rows?: number;
}

const TableSkeleton: FC<TableSkeletonProps> = ({ cols, rows = 5 }) => {
  const skeletonHeadRows = Array.from({ length: cols }, (_, colIndex) => (
    <Table.Th key={`skeleton-cell-${colIndex}`}>
      <Skeleton height={28} width="35%" />
    </Table.Th>
  ));

  const skeletonRows = Array.from({ length: rows }, (_, rowIndex) => (
    <Table.Tr key={`skeleton-row-${rowIndex}`}>
      {Array.from({ length: cols }, (_, colIndex) => (
        <Table.Td key={`skeleton-cell-${rowIndex}-${colIndex}`}>
          <Skeleton height={28} width="35%" />
        </Table.Td>
      ))}
    </Table.Tr>
  ));

  return (
    <Table verticalSpacing="md" withTableBorder striped>
      <Table.Thead>
        <Table.Tr>{skeletonHeadRows}</Table.Tr>
      </Table.Thead>
      <Table.Tbody>{skeletonRows}</Table.Tbody>
    </Table>
  );
};

export default TableSkeleton;
