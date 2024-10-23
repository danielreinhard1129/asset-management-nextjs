import { Tabs } from "@mantine/core";
import { FC } from "react";
import { BastTabs } from "../../types";

interface TabsHeaderProps {}

const TabsHeader: FC<TabsHeaderProps> = () => {
  return (
    <Tabs.List grow>
      {Object.values(BastTabs).map((value, index) => (
        <Tabs.Tab key={index} value={value}>
          {value}
        </Tabs.Tab>
      ))}
    </Tabs.List>
  );
};

export default TabsHeader;
