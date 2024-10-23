"use client";

import { Input, Tabs } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { HomeTabs } from "../types";
import TabsBody from "./TabsBody";
import TabsHeader from "./TabsHeader";
import { useDebouncedValue } from "@mantine/hooks";

const TabsHome = () => {
  const [activeTab, setActiveTab] = useState<HomeTabs>(HomeTabs.MY_ASSET);
  const [search, setSearch] = useState<string>("");
  const [searchDebounced] = useDebouncedValue(search, 250);

  return (
    <Tabs
      value={activeTab}
      onChange={(value) => {
        setActiveTab(value as HomeTabs);
        setSearch("");
      }}
    >
      <TabsHeader />
      <Input
        placeholder="Search..."
        mt="sm"
        rightSection={<IconSearch />}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <TabsBody activeTab={activeTab} search={searchDebounced} />
    </Tabs>
  );
};

export default TabsHome;
