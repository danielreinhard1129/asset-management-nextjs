import {
  AssetRequest,
  StatusAssetRequest,
} from "@/features/asset-request/types";
import { Divider, Grid, Modal, Text } from "@mantine/core";
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
    <Modal opened={opened} onClose={close}>
      <Divider />
      <ModalBody assetRequest={selectedAssetRequest} />
    </Modal>
  );
};

export default ModalAssetRequest;

const ModalHeader: FC<{ title: string }> = ({ title }) => {
  return (
    <>
      <Divider />
    </>
  );
};

const ModalBody: FC<{ assetRequest: AssetRequest }> = ({ assetRequest }) => {
  // const assetStatus = useMemo(() => {
  //   switch (assetRequest.status) {
  //     case StatusAssetRequest.APPROVE:
  //       return "green";
  //     case StatusAssetRequest.IN_PROGRESS:
  //       return "cyan";
  //     case StatusAssetRequest.PENDING:
  //       return "yellow";
  //     case StatusAssetRequest.REJECT:
  //       return "red";
  //     default:
  //       return "gray";
  //   }
  // }, [assetRequest.status]);

  return (
    <Grid>
      <Grid.Col span={5}>
        <Text fw="bold">Title</Text>
      </Grid.Col>
      {/* <Grid.Col span={7}>
        <Text>: {assetRequest.asset.name}</Text>
      </Grid.Col> */}

      {/* <Grid.Col span={5}>
        <Text fw="bold">Status</Text>
      </Grid.Col>
      <Grid.Col span={7}>
        :{" "}
        <Badge color={assetStatus.color}>
          <Text>{assetStatus.label}</Text>
        </Badge>
      </Grid.Col> */}

      {/* <Grid.Col span={5}>
        <Text fw="bold">Approve By HR</Text>
      </Grid.Col>
      <Grid.Col span={7}>
        <Text>
          :{" "}
          {assetRequest.hrId
            ? `${assetRequest.hr?.firstName} ${assetRequest.hr?.lastName}`
            : "-"}
        </Text>
      </Grid.Col> */}
    </Grid>
  );
};
