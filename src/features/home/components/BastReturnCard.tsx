import {
  AssetReturned,
  StatusAssetReturned,
} from "@/features/asset-return/types";
import { Flex, Stack, Text } from "@mantine/core";
import { IconChevronRight, IconFileDescription } from "@tabler/icons-react";
import { FC, useMemo } from "react";

interface BastReturnCardProps {
  assetReturned: AssetReturned;
}

const BastReturnCard: FC<BastReturnCardProps> = ({ assetReturned }) => {
  const statusColor = useMemo(() => {
    switch (assetReturned.status) {
      case StatusAssetReturned.APPROVE:
        return "teal";
      case StatusAssetReturned.DONE:
        return "lightgreen";
      case StatusAssetReturned.IN_PROGRESS:
        return "skyblue";
      case StatusAssetReturned.PENDING:
        return "orange";
      case StatusAssetReturned.REJECT:
        return "red";
      default:
        return "gray";
    }
  }, [assetReturned.status]);

  return (
    <Flex
      p="xs"
      style={{ border: "1px solid lightgray", borderRadius: "4px" }}
      justify="space-between"
      align="center"
      //   onClick={onClick}
    >
      <Flex gap="lg" align="center">
        <IconFileDescription size="44px" color={statusColor} />
        <Stack gap="0">
          <Text fw="bold" fz="sm">
            {assetReturned.bast.bastNo}
          </Text>
          <Text fz="sm">
            {assetReturned.user.firstName} {assetReturned.user.lastName}
          </Text>
        </Stack>
      </Flex>

      <IconChevronRight size="30px" />
    </Flex>
  );
};

export default BastReturnCard;
