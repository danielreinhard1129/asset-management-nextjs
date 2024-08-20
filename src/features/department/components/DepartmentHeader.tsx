"use client";

import { ActionIcon, Button, Flex, Group, Input } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFilter, IconPlus, IconSearch } from "@tabler/icons-react";
import { ChangeEvent, FC } from "react";
import DepartmentDrawerFilter from "./DepartmentDrawerFilter";
import DepartmentModalCreate from "./DepartmentModalCreate";

interface DepartmentHeaderProps {
  search: string | undefined;
  setSortOrder: (value: "asc" | "desc") => void;
  setLocation: (value: string) => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DepartmentHeader: FC<DepartmentHeaderProps> = ({
  search,
  setLocation,
  setSortOrder,
  onChangeInput,
}) => {
  const [openedDrawer, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const [
    openedModalCreate,
    { open: openModalCreate, close: closeModalCreate },
  ] = useDisclosure(false);

  return (
    <>
      <Flex justify="space-between">
        <Input
          placeholder="Search"
          leftSection={<IconSearch />}
          onChange={onChangeInput}
          value={search}
        />

        <Group>
          <ActionIcon
            size="input-sm"
            aria-label="filter"
            variant="light"
            onClick={openDrawer}
          >
            <IconFilter />
          </ActionIcon>
          <Button
            leftSection={<IconPlus />}
            variant="gradient"
            onClick={openModalCreate}
          >
            Create
          </Button>
        </Group>
      </Flex>
      <DepartmentDrawerFilter
        opened={openedDrawer}
        close={closeDrawer}
        setLocation={setLocation}
        setSortOrder={setSortOrder}
      />
      <DepartmentModalCreate
        opened={openedModalCreate}
        close={closeModalCreate}
      />
    </>
  );
};

export default DepartmentHeader;
