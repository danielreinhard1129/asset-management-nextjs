"use client";

import TableDataEmpty from "@/components/TableDataEmpty";
import { capitalizeFirstLetters } from "@/utils/formatters";
import { ActionIcon, Box, Menu, rem, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import { FC, useState } from "react";
import useDelete from "../hooks/useDelete";
import { Department } from "../types";
import DepartmentModalEdit from "./DepartmentModalEdit";

interface DepartmentTableProps {
  departments: Department[];
}

const DepartmentTable: FC<DepartmentTableProps> = ({ departments }) => {
  const { openDeleteModal } = useDelete();

  const [opened, { open, close }] = useDisclosure(false);

  const [department, setDepartment] = useState<Department | null>(null);

  return (
    <Box pos="relative">
      <Table
        highlightOnHover={!!departments.length}
        verticalSpacing="md"
        withTableBorder
        striped
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Department</Table.Th>
            <Table.Th>Location</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {!departments.length && <TableDataEmpty colSpan={3} />}

          {departments.map((department, index) => (
            <Table.Tr key={index}>
              <Table.Td>{capitalizeFirstLetters(department.name)}</Table.Td>
              <Table.Td>{capitalizeFirstLetters(department.address)}</Table.Td>
              <Table.Td>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <ActionIcon aria-label="filter" variant="light">
                      <IconDotsVertical size="20px" />
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={() => {
                        setDepartment(department);
                        open();
                      }}
                      leftSection={
                        <IconEdit style={{ width: rem(14), height: rem(14) }} />
                      }
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => openDeleteModal(department)}
                      leftSection={
                        <IconTrash
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                    >
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <DepartmentModalEdit
        department={department}
        opened={opened}
        close={close}
      />
    </Box>
  );
};

export default DepartmentTable;
