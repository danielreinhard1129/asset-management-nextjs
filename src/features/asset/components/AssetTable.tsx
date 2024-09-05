import TableDataEmpty from "@/components/TableDataEmpty";
import { capitalizeFirstLetters } from "@/utils/formatters";
import { ActionIcon, Badge, Image, Menu, rem, Table } from "@mantine/core";
import {
  IconDotsVertical,
  IconEdit,
  IconInfoCircle,
  IconTrash,
} from "@tabler/icons-react";
import { FC, useMemo } from "react";
import { Asset, Status } from "../types";

interface AssetTableProps {
  assets: Asset[];
}

const AssetTableHead: FC = () => {
  return (
    <Table.Thead>
      <Table.Tr>
        <Table.Th>Image</Table.Th>
        <Table.Th>Name</Table.Th>
        <Table.Th>Tag</Table.Th>
        <Table.Th>Serial</Table.Th>
        <Table.Th>Status</Table.Th>
        <Table.Th>Action</Table.Th>
      </Table.Tr>
    </Table.Thead>
  );
};

const AssetTableRow: FC<{ asset: Asset }> = ({ asset }) => {
  const statusColor = useMemo(() => {
    switch (asset.status) {
      case Status.AVAILABLE:
        return "green";
      case Status.BROKEN:
        return "red";
      case Status.IN_USE:
        return "blue";
      case Status.MAINTENANCE:
        return "orange";
      case Status.MISSING:
        return "red";
      case Status.RETIRED:
        return "gray";
      default:
        return "gray";
    }
  }, [asset.status]);

  return (
    <Table.Tr>
      <Table.Td>
        <Image
          w="100px"
          h="72px"
          src={asset.image}
          alt="image"
          fit="cover"
          radius="xs"
        />
      </Table.Td>
      <Table.Td>{capitalizeFirstLetters(asset.name)}</Table.Td>
      <Table.Td>{capitalizeFirstLetters(asset.tag)}</Table.Td>
      <Table.Td>{asset.serial}</Table.Td>
      <Table.Td>
        <Badge color={statusColor}>{asset.status}</Badge>
      </Table.Td>
      <Table.Td>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon aria-label="filter" variant="light">
              <IconDotsVertical size="20px" />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              // onClick={() => {
              //   setDepartment(department);
              //   open();
              // }}
              leftSection={
                <IconInfoCircle style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Detail
            </Menu.Item>
            <Menu.Item
              // onClick={() => {
              //   setDepartment(department);
              //   open();
              // }}
              leftSection={
                <IconEdit style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Edit
            </Menu.Item>
            <Menu.Item
              // onClick={() => openDeleteModal(department)}
              leftSection={
                <IconTrash style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  );
};

const AssetTable: FC<AssetTableProps> = ({ assets }) => {
  return (
    <Table
      highlightOnHover={!!assets.length}
      verticalSpacing="md"
      withTableBorder
      striped
    >
      <AssetTableHead />
      <Table.Tbody>
        {!assets.length && <TableDataEmpty colSpan={6} />}
        {assets.map((asset, index) => (
          <AssetTableRow key={index} asset={asset} />
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default AssetTable;
