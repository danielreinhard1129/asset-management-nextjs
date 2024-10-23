"use client";

import useGetInfoResources from "@/features/info/api/useGetInfoResources";
import { Box, Flex, Stack, Text } from "@mantine/core";
import {
  Icon,
  IconDevices,
  IconFileInfo,
  IconProps,
  IconUsers,
} from "@tabler/icons-react";
import { FC, ForwardRefExoticComponent, RefAttributes } from "react";

const DashboardHeader = () => {
  const { data: resources } = useGetInfoResources();

  return (
    <Flex gap="xl" align="center">
      <BoxInfo
        title="TOTAL ASSET"
        value={resources?.totalAsset || 0}
        color="#FF7F7F"
        icon={IconDevices}
      />
      <BoxInfo
        title="TOTAL USER"
        value={resources?.totalUser || 0}
        color="lightseagreen"
        icon={IconUsers}
      />
      <BoxInfo
        title="TOTAL BAST"
        value={resources?.totalBast || 0}
        color="lightslategray"
        icon={IconFileInfo}
      />
    </Flex>
  );
};

const BoxInfo: FC<{
  title: string;
  value: number;
  color: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
}> = ({ title, value, color, icon: Icon }) => {
  return (
    <Box
      p="sm"
      miw="300px"
      style={{
        borderLeft: `6px solid ${color}`,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
      }}
    >
      <Flex justify="space-between" align="center">
        <Stack>
          <Text fw="bolder" fz="h1">
            {value}
          </Text>
          <Text fw="bolder">{title}</Text>
        </Stack>
        <Flex
          w="60px"
          h="60px"
          justify="center"
          align="center"
          style={{ borderRadius: "100%", backgroundColor: color }}
        >
          <Icon color="white" />
        </Flex>
      </Flex>
    </Box>
  );
};

export default DashboardHeader;
