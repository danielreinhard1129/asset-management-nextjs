"use client";

import { useGetUnreadNotifications } from "@/features/notifications/api/useGetUnreadNotifications";
import { Box, Divider, Flex, Indicator } from "@mantine/core";
import {
  IconBell,
  IconFilePlus,
  IconHome,
  IconQrcode,
  IconUser,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";

const BottomTabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: unreadNotifications } = useGetUnreadNotifications();

  return (
    <Box pos="fixed" bottom={0} pb="8px" w="100%" maw="30em">
      <Divider pt="8px" />
      <Flex align="center" justify="space-evenly">
        {items.map(({ href, icon: Icon }) => (
          <Indicator
            key={href}
            size={!!unreadNotifications && href === "/notifications" ? 10 : 0}
            offset={10}
            position="top-end"
          >
            <Box
              onClick={() => router.push(href)}
              style={{ cursor: "pointer" }}
              p="10px"
              pos="relative"
            >
              <Icon color={pathname === href ? "red" : "black"} />
            </Box>
          </Indicator>
        ))}
      </Flex>
    </Box>
  );
};

export default BottomTabs;

const items = [
  { href: "/", icon: IconHome },
  { href: "/bast", icon: IconFilePlus },
  { href: "/scan", icon: IconQrcode },
  { href: "/notifications", icon: IconBell },
  { href: "/profile", icon: IconUser },
];
