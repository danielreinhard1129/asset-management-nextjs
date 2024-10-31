import {
  AssetRequest,
  StatusAssetRequest,
} from "@/features/asset-request/types";
import { Badge, Flex, Grid, List, Modal, Text } from "@mantine/core";
import { format } from "date-fns";
import { FC, useMemo } from "react";

interface ModalAssetRequestProps {
  opened: boolean;
  close: () => void;
  selectedAssetRequest: AssetRequest | null;
}

const ModalAssetRequest: FC<ModalAssetRequestProps> = ({
  selectedAssetRequest,
  opened,
  close,
}) => {
  if (!selectedAssetRequest) return;

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        <Text size="lg" fw="bold">
          Asset Request Detail
        </Text>
      }
      styles={{ header: { fontWeight: "bolder" } }}
    >
      <ModalBody assetRequest={selectedAssetRequest} />
    </Modal>
  );
};

export default ModalAssetRequest;

const ModalBody: FC<{ assetRequest: AssetRequest }> = ({ assetRequest }) => {
  const assetRequestStatus = useMemo(() => {
    switch (assetRequest.status) {
      case StatusAssetRequest.APPROVE:
        return "green";
      case StatusAssetRequest.IN_PROGRESS:
        return "cyan";
      case StatusAssetRequest.PENDING:
        return "yellow";
      case StatusAssetRequest.REJECT:
        return "red";
      default:
        return "gray";
    }
  }, [assetRequest.status]);

  return (
    <Grid>
      <Grid.Col span={4}>
        <Text fw="bold">BAST No</Text>
      </Grid.Col>
      <Grid.Col span={8}>
        <Text>: {assetRequest.bast.bastNo}</Text>
      </Grid.Col>

      <Grid.Col span={4}>
        <Text fw="bold">Manager</Text>
      </Grid.Col>
      <Grid.Col span={8}>
        <Text>
          : {`${assetRequest.user.firstName} ${assetRequest.user.lastName}`}
        </Text>
      </Grid.Col>

      <Grid.Col span={4}>
        <Text fw="bold">Assign To</Text>
      </Grid.Col>
      <Grid.Col span={8}>
        <Text>: {assetRequest.assignToUser}</Text>
      </Grid.Col>

      <Grid.Col span={4}>
        <Text fw="bold">Status</Text>
      </Grid.Col>
      <Grid.Col span={8}>
        : <Badge color={assetRequestStatus}>{assetRequest.status}</Badge>
      </Grid.Col>

      <Grid.Col span={4}>
        <Text fw="bold">Created At</Text>
      </Grid.Col>
      <Grid.Col span={8}>
        <Text>: {format(assetRequest.createdAt, "dd MMM yyyy - hh:mm")}</Text>
      </Grid.Col>

      <Grid.Col span={4}>
        <Text fw="bold">Req Items</Text>
      </Grid.Col>
      <Grid.Col span={8}>
        <Flex gap="xs">
          <Text>: </Text>
          <List>
            {assetRequest.assetRequestItems.map((item) => (
              <List.Item key={item.id}>{item.category.name}</List.Item>
            ))}
          </List>
        </Flex>
      </Grid.Col>

      {!!assetRequest.bast.bastItems.length && (
        <>
          <Grid.Col span={4}>
            <Text fw="bold">Assign Assets</Text>
          </Grid.Col>
          <Grid.Col span={8}>
            <Flex gap="xs">
              <Text>: </Text>
              <List>
                {assetRequest.bast.bastItems.map((item) => (
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
