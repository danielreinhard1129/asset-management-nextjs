import {
  AssetReturned,
  StatusAssetReturned,
} from "@/features/asset-return/types";
import { Badge, Flex, Grid, List, Modal, Text } from "@mantine/core";
import { format } from "date-fns";
import { FC, useMemo } from "react";

interface ModalAssetReturnProps {
  opened: boolean;
  close: () => void;
  selectedAssetReturn: AssetReturned | null;
}

const ModalAssetReturn: FC<ModalAssetReturnProps> = ({
  selectedAssetReturn,
  opened,
  close,
}) => {
  if (!selectedAssetReturn) return;

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        <Text size="lg" fw="bold">
          Asset Return Detail
        </Text>
      }
      styles={{ header: { fontWeight: "bolder" } }}
    >
      <ModalBody assetReturn={selectedAssetReturn} />
    </Modal>
  );
};

export default ModalAssetReturn;

const ModalBody: FC<{ assetReturn: AssetReturned }> = ({ assetReturn }) => {
  const assetReturnStatus = useMemo(() => {
    switch (assetReturn.status) {
      case StatusAssetReturned.DONE:
        return "green";
      case StatusAssetReturned.IN_PROGRESS:
        return "cyan";
      case StatusAssetReturned.PENDING:
        return "yellow";
      case StatusAssetReturned.REJECT:
        return "red";
      default:
        return "gray";
    }
  }, [assetReturn.status]);

  return (
    <Grid>
      <Grid.Col span={4}>
        <Text fw="bold">BAST No</Text>
      </Grid.Col>
      <Grid.Col span={8}>
        <Text>: {assetReturn.bast.bastNo}</Text>
      </Grid.Col>

      <Grid.Col span={4}>
        <Text fw="bold">Manager</Text>
      </Grid.Col>
      <Grid.Col span={8}>
        <Text>
          : {`${assetReturn.user.firstName} ${assetReturn.user.lastName}`}
        </Text>
      </Grid.Col>

      <Grid.Col span={4}>
        <Text fw="bold">Status</Text>
      </Grid.Col>
      <Grid.Col span={8}>
        : <Badge color={assetReturnStatus}>{assetReturn.status}</Badge>
      </Grid.Col>

      <Grid.Col span={4}>
        <Text fw="bold">Created At</Text>
      </Grid.Col>
      <Grid.Col span={8}>
        <Text>: {format(assetReturn.createdAt, "dd MMM yyyy - hh:mm")}</Text>
      </Grid.Col>

      {!!assetReturn.bast.bastItems.length && (
        <>
          <Grid.Col span={4}>
            <Text fw="bold">Return Assets</Text>
          </Grid.Col>
          <Grid.Col span={8}>
            <Flex gap="xs">
              <Text>: </Text>
              <List>
                {assetReturn.bast.bastItems.map((item) => (
                  <List.Item key={item.id}>{item.asset.name}</List.Item>
                ))}
              </List>
            </Flex>
          </Grid.Col>
        </>
      )}
    </Grid>
  );
};
