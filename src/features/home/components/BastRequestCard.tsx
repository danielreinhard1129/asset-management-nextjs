import {
  AssetRequest,
  StatusAssetRequest,
} from "@/features/asset-request/types";
import { Flex, Stack, Text } from "@mantine/core";
import { IconChevronRight, IconFileDescription } from "@tabler/icons-react";
import { FC, useMemo } from "react";

interface BastRequestCardProps {
  assetRequest: AssetRequest;
  onClick: () => void;
}

const BastRequestCard: FC<BastRequestCardProps> = ({
  assetRequest,
  onClick,
}) => {
  const statusColor = useMemo(() => {
    switch (assetRequest.status) {
      case StatusAssetRequest.APPROVE:
        return "lightgreen";
      case StatusAssetRequest.CLAIMED:
        return "teal";
      case StatusAssetRequest.IN_PROGRESS:
        return "skyblue";
      case StatusAssetRequest.PENDING:
        return "orange";
      case StatusAssetRequest.REJECT:
        return "red";
      default:
        return "gray";
    }
  }, [assetRequest.status]);

  return (
    <Flex
      p="xs"
      style={{ border: "1px solid lightgray", borderRadius: "4px" }}
      justify="space-between"
      align="center"
      onClick={onClick}
    >
      <Flex gap="lg" align="center">
        <IconFileDescription size="44px" color={statusColor} />
        <Stack gap="0">
          <Text fw="bold" fz="sm">
            {assetRequest.bast.bastNo}
          </Text>
          <Text fz="sm">
            {assetRequest.user.firstName} {assetRequest.user.lastName}
          </Text>
        </Stack>
      </Flex>

      <IconChevronRight size="30px" />
    </Flex>
  );
};

export default BastRequestCard;
