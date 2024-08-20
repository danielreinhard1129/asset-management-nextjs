"use client";

import { AppShell, Box, Burger, Flex, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PropsWithChildren } from "react";
import Sidebar from "./Sidebar";
import ToggleButtonDarkMode from "./ToggleButtonDarkMode";

const AppShellDashboard = ({ children }: PropsWithChildren) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 65 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Flex align="center" h="100%" mx={{ base: "sm", sm: "xl" }} gap="sm">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

          <Flex justify="space-between" align="center" w="100%">
            <Title size="h2">Asset Management</Title>
            <ToggleButtonDarkMode />
          </Flex>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Box p="lg">{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
};

export default AppShellDashboard;
