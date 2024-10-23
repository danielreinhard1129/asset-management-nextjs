"use client";

import { Grid, Stack, Text } from "@mantine/core";
import DashboardTableAssetCategories from "./DashboardTableAssetCategories";
import DashboardTableDepartments from "./DashboardTableDepartments";

const DashboardBodySecond = () => {
  return (
    <Grid>
      <Grid.Col span={6}>
        <Stack
          gap="sm"
          p="lg"
          style={{ backgroundColor: "white", borderRadius: "8px" }}
        >
          <Text fw="bolder">Asset Categories</Text>
          <DashboardTableAssetCategories />
        </Stack>
      </Grid.Col>
      <Grid.Col span={6}>
        <Stack
          gap="sm"
          p="lg"
          style={{ backgroundColor: "white", borderRadius: "8px" }}
        >
          <Text fw="bolder">Departments</Text>
          <DashboardTableDepartments />
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default DashboardBodySecond;
