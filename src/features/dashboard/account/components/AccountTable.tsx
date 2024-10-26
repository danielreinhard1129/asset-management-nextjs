import TableDataEmpty from "@/components/TableDataEmpty";
import { User } from "@/features/user/types";
import { capitalizeFirstLetters } from "@/utils/formatters";
import { ActionIcon, Menu, rem, Table, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { FC } from "react";
import useDeleteAccount from "../api/useDeleteAccount";

interface AccountTableProps {
  accounts: User[];
}

const AccountTableHead: FC = () => {
  return (
    <Table.Thead>
      <Table.Tr>
        <Table.Th>Name</Table.Th>
        <Table.Th>Email</Table.Th>
        <Table.Th>Role</Table.Th>
        <Table.Th>Department</Table.Th>
        <Table.Th>Created At</Table.Th>
        <Table.Th>Action</Table.Th>
      </Table.Tr>
    </Table.Thead>
  );
};

const AccountTableRow: FC<{
  account: User;
  openDeleteAccountModal: (userId: number) => void;
}> = ({ account, openDeleteAccountModal }) => {
  const router = useRouter();

  return (
    <Table.Tr>
      <Table.Td>
        {capitalizeFirstLetters(`${account.firstName} ${account.lastName}`)}
      </Table.Td>
      <Table.Td>{account.email}</Table.Td>
      <Table.Td>{account.role}</Table.Td>
      <Table.Td>{account.department.name}</Table.Td>
      <Table.Td>{format(account.createdAt, "dd MMM yyyy - hh:mm")}</Table.Td>
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
                router.push(`/dashboard/accounts/${account.id}/edit`)
              }
              leftSection={
                <IconEdit style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Edit
            </Menu.Item>
            <Menu.Item
              onClick={() => openDeleteAccountModal(account.id)}
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

const AccountTable: FC<AccountTableProps> = ({ accounts }) => {
  const { mutateAsync: deleteAccount } = useDeleteAccount();

  const openDeleteAccountModal = (userId: number) => {
    modals.openConfirmModal({
      title: `Delete Account`,
      centered: true,
      children: (
        <Text size="sm">Please click one of these buttons to proceed.</Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        deleteAccount(userId);
      },
    });
  };

  return (
    <Table
      highlightOnHover={!!accounts.length}
      verticalSpacing="md"
      withTableBorder
      striped
    >
      <AccountTableHead />
      <Table.Tbody>
        {!accounts.length && <TableDataEmpty colSpan={6} />}
        {accounts.map((account, index) => (
          <AccountTableRow
            key={index}
            account={account}
            openDeleteAccountModal={openDeleteAccountModal}
          />
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default AccountTable;
