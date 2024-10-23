import { Divider, Stack } from "@mantine/core";
import DashboardBodyFirst from "./components/DashboardBodyFirst";
import DashboardBodySecond from "./components/DashboardBodySecond";
import DashboardHeader from "./components/DashboardHeader";

const DashboardPage = () => {
  return (
    <Stack gap="lg">
      <DashboardHeader />
      <Divider my="xs" />
      <DashboardBodyFirst />
      <Divider my="xs" />
      <DashboardBodySecond />
    </Stack>
  );
};

export default DashboardPage;
