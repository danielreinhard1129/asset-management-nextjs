import { ActionIcon, Button, Flex, Group, Input } from "@mantine/core";
import { IconFilter, IconPlus, IconSearch } from "@tabler/icons-react";
import { ChangeEvent, FC } from "react";

interface AssetHeaderProps {
  search: string;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AssetHeader: FC<AssetHeaderProps> = ({ search, onChangeInput }) => {
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
            // onClick={openDrawer}
          >
            <IconFilter />
          </ActionIcon>
          <Button
            leftSection={<IconPlus />}
            variant="gradient"
            // onClick={openModalCreate}
          >
            Create
          </Button>
        </Group>
      </Flex>
    </>
  );
};

export default AssetHeader;
