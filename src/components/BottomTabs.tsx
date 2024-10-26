"use client";

import { Box, Divider, Flex } from "@mantine/core";
import {
  IconFilePlus,
  IconHome,
  IconQrcode,
  IconUser,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";

const BottomTabs = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Box pos="fixed" bottom={0} pb="8px" w="100%" maw="30em">
      <Divider pt="8px" />
      <Flex align="center" justify="space-evenly">
        {items.map(({ href, icon: Icon }) => (
          <Box
            key={href}
            onClick={() => router.push(href)}
            style={{ cursor: "pointer" }}
            p="10px"
          >
            <Icon color={pathname === href ? "red" : "black"} />
          </Box>
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
  { href: "/profile", icon: IconUser },
];
