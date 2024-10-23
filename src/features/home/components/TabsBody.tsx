import { ScrollArea, Stack, Tabs } from "@mantine/core";
import { FC } from "react";
import { HomeTabs } from "../types";
import AssetRequestList from "./AssetRequestList";
import AssetReturnedList from "./AssetReturnedList";
import MyAssetList from "./MyAssetList";

interface TabsBodyProps {
  activeTab: HomeTabs;
  search: string;
}

const TabsBody: FC<TabsBodyProps> = ({ activeTab, search }) => {
  return (
    <Tabs.Panel value={activeTab}>
      <ScrollArea h="53.5vh" type="never">
        <Stack mt="md" gap="sm">
          {activeTab === HomeTabs.MY_ASSET && (
            <MyAssetList search={search} />
          )}
          {activeTab === HomeTabs.REQUEST && (
            <AssetRequestList search={search} />
          )}
          {activeTab === HomeTabs.RETURN && (
            <AssetReturnedList search={search} />
          )}
        </Stack>
      </ScrollArea>
    </Tabs.Panel>
  );
};

export default TabsBody;
