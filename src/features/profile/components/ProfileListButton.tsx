"use client";

import { Button, Container, Divider, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconLogout, IconPasswordMobilePhone } from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import ModalChangePassword from "./ModalChangePassword";
import { useDisclosure } from "@mantine/hooks";

const ProfileListButton = () => {
  const [opened, { open, close }] = useDisclosure(false);

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
    <>
      <Container>
        <Button
          my="lg"
          color="black"
          justify="left"
          variant="transparent"
          fullWidth
          leftSection={<IconPasswordMobilePhone />}
          onClick={open}
        >
          Change Password
        </Button>
        <Divider />
        <Button
          my="lg"
          justify="left"
          variant="transparent"
          fullWidth
          onClick={openLogoutModal}
          leftSection={<IconLogout />}
        >
          Logout
        </Button>
        <Divider />
      </Container>
      <ModalChangePassword opened={opened} onClose={close} />
    </>
  );
};

export default ProfileListButton;
