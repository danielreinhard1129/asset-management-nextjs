import { Flex, FlexProps, Text } from "@mantine/core";
import React, { FC } from "react";

interface DashboardEmptyProps extends FlexProps {
  message: string;
}

const DashboardEmpty: FC<DashboardEmptyProps> = (props) => {
  return (
    <Flex justify="center" align="center" {...props}>
      <Text size="xl">{props.message}</Text>
    </Flex>
  );
};

export default DashboardEmpty;
