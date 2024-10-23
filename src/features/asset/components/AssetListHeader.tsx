import { ActionIcon, Flex, Input } from "@mantine/core";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import { FC } from "react";

interface HeaderProps {
  search: string;
  setSearch: (value: string) => void;
}

const AssetListHeader: FC<HeaderProps> = ({ search, setSearch }) => {
  return (
    <Flex mt="xl" justify="space-between" gap="md">
      <Input
        w="100%"
        placeholder="Search Asset"
        leftSection={<IconSearch />}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      <ActionIcon
        size="input-sm"
        aria-label="filter"
        variant="light"
        // onClick={openDrawer}
      >
        <IconFilter />
      </ActionIcon>
    </Flex>
  );
};

export default AssetListHeader;
