import { Flex, FlexProps, Loader } from "@mantine/core";
import { FC } from "react";

interface DashboardLoaderProps extends FlexProps {}

const DashboardLoader: FC<DashboardLoaderProps> = (props) => {
  return (
    <Flex justify="center" align="center" {...props}>
      <Loader />
    </Flex>
  );
};

export default DashboardLoader;
