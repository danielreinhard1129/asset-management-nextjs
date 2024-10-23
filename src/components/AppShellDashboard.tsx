"use client";

import {
  AppShell,
  Box,
  Burger,
  Button,
  Flex,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconLogout } from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import { PropsWithChildren } from "react";
import Sidebar from "./Sidebar";

const AppShellDashboard = ({ children }: PropsWithChildren) => {
  const [opened, { toggle }] = useDisclosure();

  const openLogoutModal = () =>
    modals.openConfirmModal({
      title: "Logout",
      centered: true,
      children: <Text size="sm">Are you sure you want to log out?</Text>,
      labels: { confirm: "Logout", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: async () => await signOut(),
    });

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      {/* <AppShell.Header style={{ backgroundColor: "red" }}> */}
      <AppShell.Header style={{ backgroundColor: "#FF474C" }}>
        <Flex align="center" h="100%" mx={{ base: "sm", sm: "xl" }} gap="sm">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

          <Flex justify="space-between" align="center" w="100%">
            <Flex align="center" gap="md">
              <Flex
                h="50px"
                w="50px"
                style={{ borderRadius: "100%", backgroundColor: "lightgray" }}
                justify="center"
                align="center"
              >
                <Text size="sm">LOGO</Text>
              </Flex>
              <Stack gap="0">
                <Text c="white" fw="bold">
                  PT XYZ
                </Text>
                <Text c="white" fw="bold">
                  ASSET MANAGEMENT
                </Text>
              </Stack>
            </Flex>
            <Button
              onClick={openLogoutModal}
              leftSection={<IconLogout />}
              variant="transparent"
              c="white"
            >
              LOGOUT
            </Button>
          </Flex>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main style={{ backgroundColor: "#f3f6f6" }}>
        <Box p="lg">{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
};

export default AppShellDashboard;
