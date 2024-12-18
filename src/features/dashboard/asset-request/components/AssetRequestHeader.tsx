import { ActionIcon, Flex, Input } from "@mantine/core";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import { ChangeEvent, FC } from "react";

interface AssetRequestHeaderProps {
  search: string;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AssetRequestHeader: FC<AssetRequestHeaderProps> = ({
  search,
  onChangeInput,
}) => {
  return (
    <>
      <Flex justify="space-between">
        <Input
          placeholder="Search"
          leftSection={<IconSearch />}
          onChange={onChangeInput}
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
    </>
  );
};

export default AssetRequestHeader;
