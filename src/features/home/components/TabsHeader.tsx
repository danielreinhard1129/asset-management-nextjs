import { Tabs } from "@mantine/core";
import { FC } from "react";
import { HomeTabs } from "../types";

interface TabsHeaderProps {}

const TabsHeader: FC<TabsHeaderProps> = () => {
  return (
    <Tabs.List
      grow
      styles={{
        list: {
          overflowX: "scroll",
          flexWrap: "nowrap",
          scrollbarWidth: "none",
        },
      }}
    >
      {Object.values(HomeTabs).map((value, index) => (
        <Tabs.Tab key={index} value={value}>
          {value}
        </Tabs.Tab>
      ))}
    </Tabs.List>
  );
};

export default TabsHeader;
