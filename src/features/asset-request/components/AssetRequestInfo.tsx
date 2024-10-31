import BastPdf from "@/components/BastPdf";
import useDoneAssetRequest from "@/features/dashboard/asset-request/api/useDoneAssetRequest";
import useGetBastByBastNo from "@/features/dashboard/bast/api/useGetBastByBastNo";
import { Badge, Box, Button, Flex, Grid, List, Text } from "@mantine/core";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { format } from "date-fns";
import { FC, useMemo } from "react";
import { AssetRequest, StatusAssetRequest } from "../types";

interface AssetRequestInfoProps {
  assetRequest: AssetRequest;
}

const AssetRequestInfo: FC<AssetRequestInfoProps> = ({ assetRequest }) => {
  const statusColor = useMemo(() => {
    switch (assetRequest.status) {
      case StatusAssetRequest.APPROVE:
        return "green";
      case StatusAssetRequest.CLAIMED:
        return "teal";
      case StatusAssetRequest.IN_PROGRESS:
        return "blue";
      case StatusAssetRequest.PENDING:
        return "orange";
      case StatusAssetRequest.REJECT:
        return "red";
      default:
        return "gray";
    }
  }, [assetRequest.status]);

  const { mutateAsync: claimAssets, isPending } = useDoneAssetRequest(
    assetRequest.id
  );

  const { data: bast } = useGetBastByBastNo(assetRequest.bast.bastNo);

  const onClickClaimAssets = async () => {
    await claimAssets();
  };

  return (
    <Flex mt="lg" direction="column" justify="space-between" h="90%">
      <Grid>
        <Grid.Col span={4}>
          <Text fw="bold">BAST</Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text>: {assetRequest.bast.bastNo}</Text>
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
          <Text>
            : <Badge color={statusColor}>{assetRequest.status}</Badge>
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text fw="bold">Request Date</Text>
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

      {!!assetRequest.bast.bastItems.length && (
        <Box>
          <Button
            fullWidth
            mt="xl"
            color="blue"
            disabled={!!assetRequest.bast.isCheckedByUser}
            onClick={onClickClaimAssets}
            loading={isPending}
          >
            Claim Assets
          </Button>
          {bast?.isCheckedByAdmin && bast?.isCheckedByUser && (
            <PDFDownloadLink
              document={<BastPdf bast={bast} />}
              fileName={`${assetRequest.bast.bastNo}.pdf`}
              style={{ textDecoration: "none" }}
            >
              <Button fullWidth mt="sm" variant="light">
                Download Bast
              </Button>
            </PDFDownloadLink>
          )}
        </Box>
      )}
    </Flex>
  );
};

export default AssetRequestInfo;
