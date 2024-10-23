import { Asset, Status } from "@/features/dashboard/asset/types";
import { Badge, Box, Divider, Flex, Grid, Image, Text } from "@mantine/core";
import { FC, useMemo } from "react";

interface AssetBodyProps {
  asset: Asset;
}

const AssetBody: FC<AssetBodyProps> = ({ asset }) => {
  const assetStatus = useMemo(() => {
    switch (asset?.status) {
      case Status.AVAILABLE:
        return { color: "green", label: Status.AVAILABLE };
      case Status.IN_PROGRESS:
        return { color: "cyan", label: Status.IN_PROGRESS };
      case Status.BROKEN:
        return { color: "red", label: Status.BROKEN };
      case Status.IN_USE:
        return { color: "blue", label: Status.IN_USE };
      case Status.MAINTENANCE:
        return { color: "yellow", label: Status.MAINTENANCE };
      case Status.MISSING:
        return { color: "red", label: Status.MISSING };
      case Status.RETIRED:
        return { color: "red", label: Status.RETIRED };
      default:
        return { color: "blue", label: "" };
    }
  }, [asset?.status]);

  return (
    <Flex
      direction="column"
      justify="space-between"
      style={{ height: "90%" }}
      mt="xl"
    >
      <Box>
        <Image radius="md" src={asset.image} w="100%" h="250px" fit="cover" />

        <Divider my="xl" />

        <Grid>
          <Grid.Col span={4}>
            <Text fw="bold">Title</Text>
          </Grid.Col>
          <Grid.Col span={8}>
            <Text>: {asset.name}</Text>
          </Grid.Col>

          <Grid.Col span={4}>
            <Text fw="bold">Tag</Text>
          </Grid.Col>
          <Grid.Col span={8}>
            <Text>: {asset.tag}</Text>
          </Grid.Col>

          <Grid.Col span={4}>
            <Text fw="bold">Serial</Text>
          </Grid.Col>
          <Grid.Col span={8}>
            <Text>: {asset.serial}</Text>
          </Grid.Col>

          <Grid.Col span={4}>
            <Text fw="bold">Status</Text>
          </Grid.Col>
          <Grid.Col span={8}>
            :{" "}
            <Badge color={assetStatus.color}>
              <Text>{assetStatus.label}</Text>
            </Badge>
          </Grid.Col>

          <Grid.Col span={4}>
            <Text fw="bold">Category</Text>
          </Grid.Col>
          <Grid.Col span={8}>
            <Text>: {asset.category.name}</Text>
          </Grid.Col>

          {asset.userId && asset.user && (
            <>
              <Grid.Col span={4}>
                <Text fw="bold">Checkout To</Text>
              </Grid.Col>
              <Grid.Col span={8}>
                <Text>
                  : {asset.user.firstName} {asset.user.lastName}
                </Text>
              </Grid.Col>
            </>
          )}
        </Grid>
      </Box>
    </Flex>
  );
};

export default AssetBody;
