import { Button, Flex, NavLink, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconArrowBarLeft,
  IconBasketPlus,
  IconCategory,
  IconHome2,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuAvatar from "./MenuAvatar";

const Sidebar = () => {
  const pathname = usePathname();
  const session = useSession();

  const isActive = (route: string) => pathname.startsWith(route);

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
    <Flex direction="column" justify="space-between" h="100%">
      <Stack>
        <NavLink
          component={Link}
          href="/dashboard"
          label="Dashboard"
          variant="light"
          active={pathname === "/dashboard"}
          leftSection={<IconHome2 />}
        />
        <NavLink
          component={Link}
          href="/dashboard/assets"
          label="Assets"
          variant="light"
          active={isActive("/dashboard/assets")}
          leftSection={<IconBasketPlus />}
        />
        <NavLink
          component={Link}
          href="/dashboard/categories"
          label="Categories"
          variant="light"
          active={isActive("/dashboard/categories")}
          leftSection={<IconCategory />}
        />
        <NavLink
          component={Link}
          href="/dashboard/employees"
          label="Employees"
          variant="light"
          active={isActive("/dashboard/employees")}
          leftSection={<IconUsers />}
        />
        <NavLink
          component={Link}
          href="/dashboard/departments"
          label="Departments"
          variant="light"
          active={isActive("/dashboard/departments")}
          leftSection={<IconUsersGroup />}
        />
        <NavLink
          component={Button}
          label="Logout"
          onClick={openLogoutModal}
          bg="transparent"
          c="red"
          leftSection={<IconArrowBarLeft />}
        />
      </Stack>

      <MenuAvatar
        name={`${session.data?.user.firstName} ${session.data?.user.lastName}`}
        email={session.data?.user.email || ""}
      />
    </Flex>
  );
};

export default Sidebar;
