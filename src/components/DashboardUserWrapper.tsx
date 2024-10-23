import { Box, Flex } from "@mantine/core";
import { FC, PropsWithChildren } from "react";

const DashboardUserWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex w="100vw" justify="center" style={{ overflow: "hidden" }}>
      <Box w="100%" maw="30em" mih="100vh">
        {children}
      </Box>
    </Flex>
  );
};

export default DashboardUserWrapper;
