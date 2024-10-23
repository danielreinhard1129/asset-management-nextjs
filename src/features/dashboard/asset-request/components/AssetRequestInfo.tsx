import { AssetRequestItem } from "@/features/asset-request/types";
import { Box, Table, Text, Stack } from "@mantine/core";
import { FC } from "react";

interface AssetRequestInfoProps {
  assetRequestItems: AssetRequestItem[];
}

const AssetRequestInfo: FC<AssetRequestInfoProps> = ({ assetRequestItems }) => {
  const rows = assetRequestItems.map((asetRequestItem) => (
    <Table.Tr key={asetRequestItem.id}>
      <Table.Td>{asetRequestItem.category.name}</Table.Td>
      <Table.Td>{asetRequestItem.qty}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="xs">
      <Text fw="bolder" fz="sm">
        Asset Request Info
      </Text>
      <Box
        p="sm"
        style={{ border: "1px solid lightgray", borderRadius: "10px" }}
      >
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Asset Category</Table.Th>
              <Table.Th>Quantity</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>
    </Stack>
  );
};

export default AssetRequestInfo;
