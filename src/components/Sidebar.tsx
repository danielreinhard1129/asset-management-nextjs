import { Role } from "@/features/user/types";
import {
  Collapse,
  Flex,
  NavLink,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import {
  IconCategory,
  IconChevronDown,
  IconChevronUp,
  IconDevices,
  IconFileArrowLeft,
  IconHome2,
  IconLicense,
  IconSettings,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import MenuAvatar from "./MenuAvatar";

const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (!session) {
    return;
  }

  return (
    <Flex direction="column" justify="space-between" h="100%">
      <Stack>
        {singleItems
          .filter((item) => item.role.includes(session.user.role))
          .map((item) => (
            <NavLink
              key={item.href}
              component={Link}
              href={item.href}
              label={item.label}
              variant="light"
              color="red"
              active={pathname === item.href}
              leftSection={item.icon}
            />
          ))}

        {multipleItems
          .filter((item) => item.role.includes(session.user.role))
          .map((item, idx) => (
            <SidebarButtonCollapse key={idx} {...item} pathname={pathname} />
          ))}
      </Stack>

      <MenuAvatar
        name={`${session.user.firstName} ${session.user.lastName}`}
        email={session.user.email || ""}
      />
    </Flex>
  );
};

const SidebarButtonCollapse: FC<{
  label: string;
  pathname: string;
  icon: JSX.Element;
  role: Role[];
  links: {
    label: string;
    href: string;
    icon: JSX.Element;
    role: Role[];
  }[];
}> = (props) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <UnstyledButton px="12px" py="8px" onClick={() => setOpened((o) => !o)}>
        <Flex align="center" justify="space-between">
          <Flex align="center" gap="sm">
            <IconSettings />
            <Text size="sm">Master Data</Text>
          </Flex>
          {opened ? <IconChevronUp /> : <IconChevronDown />}
        </Flex>
      </UnstyledButton>
      <Collapse in={opened}>
        <Stack ml="xl">
          {props.links.map((link) => (
            <NavLink
              key={link.href}
              component={Link}
              href={link.href}
              label={link.label}
              variant="light"
              color="red"
              active={props.pathname === link.href}
              leftSection={link.icon}
            />
          ))}
        </Stack>
      </Collapse>
    </>
  );
};

const singleItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <IconHome2 />,
    role: [Role.ADMIN, Role.HR],
  },
  {
    label: "Assets",
    href: "/dashboard/assets",
    icon: <IconDevices />,
    role: [Role.ADMIN],
  },
  {
    label: "Asset Request",
    href: "/dashboard/asset-requests",
    icon: <IconLicense />,
    role: [Role.ADMIN, Role.HR],
  },
  {
    label: "Asset Return",
    href: "/dashboard/asset-returned",
    icon: <IconFileArrowLeft />,
    role: [Role.ADMIN, Role.HR],
  },
];

const multipleItems = [
  {
    label: "Master Data",
    icon: <IconSettings />,
    role: [Role.ADMIN],
    links: [
      {
        label: "Accounts",
        href: "/dashboard/accounts",
        icon: <IconUsers />,
        role: [Role.ADMIN],
      },
      {
        label: "Asset Categories",
        href: "/dashboard/asset-categories",
        icon: <IconCategory />,
        role: [Role.ADMIN],
      },
      {
        label: "Departments",
        href: "/dashboard/departments",
        icon: <IconUsersGroup />,
        role: [Role.ADMIN],
      },
    ],
  },
];

export default Sidebar;
