import { FC, useMemo } from "react";
import { AssetReturned, StatusAssetReturned } from "../types";
import { Badge, Flex, Grid, List, Text } from "@mantine/core";
import { format } from "date-fns";

interface AssetReturnInfoProps {
  assetReturn: AssetReturned;
}

const AssetReturnInfo: FC<AssetReturnInfoProps> = ({ assetReturn }) => {
  const statusColor = useMemo(() => {
    switch (assetReturn.status) {
      case StatusAssetReturned.DONE:
        return "green";
      case StatusAssetReturned.IN_PROGRESS:
        return "blue";
      case StatusAssetReturned.PENDING:
        return "orange";
      case StatusAssetReturned.REJECT:
        return "red";
      default:
        return "gray";
    }
  }, [assetReturn.status]);

  return (
    <Flex mt="lg" direction="column" justify="space-between" h="90%">
      <Grid>
        <Grid.Col span={4}>
          <Text fw="bold">BAST</Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text>: {assetReturn.bast.bastNo}</Text>
        </Grid.Col>

        <Grid.Col span={4}>
          <Text fw="bold">Status</Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text>
            : <Badge color={statusColor}>{assetReturn.status}</Badge>
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text fw="bold">Request Date</Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text>: {format(assetReturn.createdAt, "dd MMM yyyy - hh:mm")}</Text>
        </Grid.Col>

        {!!assetReturn.bast.bastItems.length && (
          <>
            <Grid.Col span={4}>
              <Text fw="bold">Return Items</Text>
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
    </Flex>
  );
};

export default AssetReturnInfo;
