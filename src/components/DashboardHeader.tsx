"use client";

import { Box, Flex, Text } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface DashboardHeaderProps {
  title?: string;
  href: string;
}

const DashboardHeader: FC<DashboardHeaderProps> = ({ title, href }) => {
  const router = useRouter();
  return (
    <Flex mt="xl" gap="lg" align="center">
      <IconChevronLeft
        size="32px"
        style={{ cursor: "pointer" }}
        onClick={() => router.push(href)}
      />
      {title && (
        <Text fw="bold" fz="xl">
          {title}
        </Text>
      )}
    </Flex>
  );
};

export default DashboardHeader;
