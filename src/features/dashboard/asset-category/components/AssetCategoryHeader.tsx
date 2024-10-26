import { ActionIcon, Button, Flex, Group, Input } from "@mantine/core";
import { IconFilter, IconPlus, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC } from "react";

interface AssetCategoryHeaderProps {
  search: string;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  setSortOrder: (value: "desc" | "asc") => void;
}

const AssetCategoryHeader: FC<AssetCategoryHeaderProps> = ({
  search,
  onChangeInput,
  setSortOrder,
}) => {
  const router = useRouter();

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
          <ActionIcon size="input-sm" aria-label="filter" variant="light">
            <IconFilter />
          </ActionIcon>
          <Button
            leftSection={<IconPlus />}
            onClick={() => router.push("/dashboard/asset-categories/create")}
          >
            Create
          </Button>
        </Group>
      </Flex>
    </>
  );
};

export default AssetCategoryHeader;
