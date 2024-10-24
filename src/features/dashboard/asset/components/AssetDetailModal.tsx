import { Asset } from "@/features/asset/types";
import { Badge, Grid, Image, Modal, Text } from "@mantine/core";
import { FC, useMemo } from "react";
import { Status } from "../types";

interface AssetDetailModalProps {
  asset: Asset | null;
  opened: boolean;
  close: () => void;
}

const AssetDetailModal: FC<AssetDetailModalProps> = ({
  opened,
  close,
  asset,
}) => {
  const assetStatus = useMemo(() => {
    switch (asset?.status) {
      case Status.AVAILABLE:
        return "green";
      case Status.IN_PROGRESS:
        return "cyan";
      case Status.MAINTENANCE:
        return "yellow";
      case Status.BROKEN:
        return "red";
      case Status.MISSING:
        return "red";
      case Status.RETIRED:
        return "red";
      case Status.IN_USE:
        return "blue";
      default:
        return "gray";
    }
  }, [asset?.status]);

  return (
    <Modal opened={opened} onClose={close} title="Asset Detail">
      <Grid>
        <Grid.Col span={12}>
          <Image
            src={asset?.image}
            alt="thumbnail asset"
            w="100%"
            h="240px"
            fit="cover"
          />
        </Grid.Col>
        <Grid.Col span={5}>
          <Text fw="bold">Title</Text>
        </Grid.Col>
        <Grid.Col span={7}>
          <Text>: {asset?.name}</Text>
        </Grid.Col>

        <Grid.Col span={5}>
          <Text fw="bold">Status</Text>
        </Grid.Col>
        <Grid.Col span={7}>
          : <Badge color={assetStatus}>{asset?.status}</Badge>
        </Grid.Col>
      </Grid>
    </Modal>
  );
};

export default AssetDetailModal;
