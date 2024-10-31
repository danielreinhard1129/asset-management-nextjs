"use client";

import useGetInfoTotalAssetByStatus from "@/features/info/api/useGetInfoTotalAssetByStatus";
import { PieChart } from "@mantine/charts";
import { Box, Grid, Stack, Text } from "@mantine/core";
import DashboardTableRecentActivity from "./DashboardTableRecentActivity";
import DashboardLoader from "@/components/DashboardLoader";

const DashboardBodyFirst = () => {
  const { data: infoTotalAssetByStatus, isPending } =
    useGetInfoTotalAssetByStatus();

  return (
    <Grid>
      <Grid.Col span={9}>
        <Stack
          gap="sm"
          p="lg"
          style={{ backgroundColor: "white", borderRadius: "8px" }}
        >
          <Text fw="bolder">Recent Activity</Text>
          <DashboardTableRecentActivity />
        </Stack>
      </Grid.Col>
      <Grid.Col span={3}>
        <Stack
          gap="sm"
          p="lg"
          style={{ backgroundColor: "white", borderRadius: "8px" }}
        >
          <Text fw="bolder">Asset By Status</Text>
          {isPending ? (
            <DashboardLoader h="27.2vh" />
          ) : (
            <Box
              p="sm"
              style={{ border: "1px solid lightgray", borderRadius: "10px" }}
            >
              <PieChart
                mx="auto"
                size={177}
                withTooltip
                withLabelsLine
                labelsPosition="outside"
                labelsType="value"
                withLabels
                data={infoTotalAssetByStatus || []}
              />
            </Box>
          )}
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default DashboardBodyFirst;
