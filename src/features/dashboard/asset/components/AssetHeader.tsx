import { ActionIcon, Button, Flex, Group, Input } from "@mantine/core";
import { IconFilter, IconPlus, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC } from "react";

interface AssetHeaderProps {
  search: string;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AssetHeader: FC<AssetHeaderProps> = ({ search, onChangeInput }) => {
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
            onClick={() => router.push("/dashboard/assets/create")}
          >
            Create
          </Button>
        </Group>
      </Flex>
    </>
  );
};

export default AssetHeader;
