import TableDataEmpty from "@/components/TableDataEmpty";
import { capitalizeFirstLetters } from "@/utils/formatters";
import { ActionIcon, Image, Menu, rem, Table, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Category } from "../types";
import useDeleteCategory from "../api/useDeleteCategory";
import { format } from "date-fns";

interface AssetCategoryTableProps {
  categories: Category[];
}

const AssetCategoryTableHead: FC = () => {
  return (
    <Table.Thead>
      <Table.Tr>
        <Table.Th>Image</Table.Th>
        <Table.Th>Name</Table.Th>
        <Table.Th>Created At</Table.Th>
        <Table.Th>Action</Table.Th>
      </Table.Tr>
    </Table.Thead>
  );
};

const AssetCategoryTableRow: FC<{
  category: Category;
  openDeleteCategoryModal: (categoryId: number) => void;
}> = ({ category, openDeleteCategoryModal }) => {
  const router = useRouter();

  return (
    <Table.Tr>
      <Table.Td>
        <Image
          w="100px"
          h="72px"
          src={category.image}
          alt="image"
          fit="cover"
          radius="xs"
        />
      </Table.Td>
      <Table.Td>{capitalizeFirstLetters(category.name)}</Table.Td>
      <Table.Td>{format(category.createdAt, "dd MMM yyy - hh:mm")}</Table.Td>
      <Table.Td>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon aria-label="filter" variant="light">
              <IconDotsVertical size="20px" />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              onClick={() =>
                router.push(`/dashboard/asset-categories/${category.id}/edit`)
              }
              leftSection={
                <IconEdit style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Edit
            </Menu.Item>
            <Menu.Item
              onClick={() => openDeleteCategoryModal(category.id)}
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

const AssetCategoryTable: FC<AssetCategoryTableProps> = ({ categories }) => {
  const { mutateAsync: deleteCategory } = useDeleteCategory();

  const openDeleteAssetModal = (assetId: number) => {
    modals.openConfirmModal({
      title: `Delete Asset Category`,
      centered: true,
      children: (
        <Text size="sm">Please click one of these buttons to proceed.</Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        deleteCategory(assetId);
      },
    });
  };

  return (
    <Table
      highlightOnHover={!!categories.length}
      verticalSpacing="md"
      withTableBorder
      striped
    >
      <AssetCategoryTableHead />
      <Table.Tbody>
        {!categories.length && <TableDataEmpty colSpan={6} />}
        {categories.map((category, index) => (
          <AssetCategoryTableRow
            key={index}
            category={category}
            openDeleteCategoryModal={openDeleteAssetModal}
          />
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default AssetCategoryTable;
