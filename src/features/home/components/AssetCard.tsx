import { Asset } from "@/features/asset/types";
import { Flex, Image, Paper, Stack, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { FC } from "react";

interface AssetCardProps {
  asset: Asset;
  onClick: (assetId: number) => void;
}

const AssetCard: FC<AssetCardProps> = ({ asset, onClick }) => {
  return (
    <Paper
      shadow="xl"
      p="sm"
      withBorder
      onClick={() => onClick(asset.id)}
      style={{ cursor: "pointer" }}
    >
      <Flex align="center" justify="space-between">
        <Flex gap="sm">
          <Image
            w="120px"
            h="60px"
            fit="cover"
            style={{ borderRadius: "4px" }}
            src={asset.image}
          />
          <Stack gap="0">
            <Text fw="bold">{asset.name}</Text>
            <Text fz="xs">{asset.tag}</Text>
          </Stack>
        </Flex>
        <IconChevronRight />
      </Flex>
    </Paper>
  );
};

export default AssetCard;
