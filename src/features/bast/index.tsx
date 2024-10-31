"use client";

import BottomTabs from "@/components/BottomTabs";
import DashboardEmpty from "@/components/DashboardEmpty";
import DashboardLoader from "@/components/DashboardLoader";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Input, ScrollArea, Stack, Tabs, Text } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetInfiniteAssets } from "../asset/api/useGetInfiniteAssets";
import useGetCategories from "../dashboard/category/api/useGetCategories";
import RequestSection from "./components/RequestSection";
import ReturnSection from "./components/ReturnSection";
import classes from "./components/Tabs/Tabs.module.css";
import TabsHeader from "./components/Tabs/TabsHeader";
import useAssetCategoryRequestCart from "./hooks/useAssetCategoryRequestCart";
import { AssetRequestSchema, AssetRequestSchemaType } from "./schemas";
import { BastTabs } from "./types";

const DATA_LIMIT = 10;

const BastPage = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);
  const { data: categories, isPending } = useGetCategories({
    take: 4,
    search: debouncedSearch,
  });

  const {
    data: response,
    isPending: isPendingMyAssets,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteAssets({
    myAsset: true,
    take: DATA_LIMIT,
    search: debouncedSearch,
  });

  const myAssets = response?.pages.flatMap((page) => page.data);

  const [activeTab, setActiveTab] = useState<BastTabs>(BastTabs.REQUEST);
  const {
    assetCategoryRequestCart,
    handleClearCart,
    handleAddToCart,
    handleRemoveFromCart,
  } = useAssetCategoryRequestCart();

  const methodsRequest = useForm<AssetRequestSchemaType>({
    resolver: zodResolver(AssetRequestSchema),
  });

  return (
    <>
      <Container pos="relative">
        <Tabs
          mt="xl"
          variant="unstyled"
          value={activeTab}
          onChange={(value) => {
            setActiveTab(value as BastTabs);
            setSearch("");
          }}
          classNames={classes}
        >
          <Stack>
            <TabsHeader />

            <Tabs.Panel value={activeTab}>
              <Stack gap="xs">
                <Text fz="sm" fw="bold">
                  Silahkan pilih perangkat yang ingin diajukan
                </Text>
                <Input
                  placeholder="Search"
                  rightSection={<IconSearch />}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Stack>

              <ScrollArea h="72vh" type="never">
                {activeTab === BastTabs.REQUEST && isPending && (
                  <DashboardLoader h="40vh" />
                )}
                {activeTab === BastTabs.REQUEST && !categories && (
                  <DashboardEmpty message="No Data" h="40vh" />
                )}
                {activeTab === BastTabs.REQUEST && categories && (
                  <FormProvider {...methodsRequest}>
                    <RequestSection
                      categories={categories.data}
                      assetCategoryRequestCart={assetCategoryRequestCart}
                      handleAddToCart={handleAddToCart}
                      handleClearCart={handleClearCart}
                      handleRemoveFromCart={handleRemoveFromCart}
                    />
                  </FormProvider>
                )}

                {activeTab === BastTabs.RETURN && isPendingMyAssets && (
                  <DashboardLoader h="40vh" />
                )}
                {activeTab === BastTabs.RETURN && !myAssets?.length && (
                  <DashboardEmpty message="No Data" h="40vh" />
                )}
                {activeTab === BastTabs.RETURN && !!myAssets?.length && (
                  <InfiniteScroll
                    dataLength={myAssets.length}
                    next={fetchNextPage}
                    hasMore={hasNextPage}
                    loader={isFetchingNextPage && <DashboardLoader />}
                    endMessage={
                      myAssets.length > DATA_LIMIT - 1 && (
                        <Text ta="center" fz="sm">
                          You have reached the end of the page.
                        </Text>
                      )
                    }
                  >
                    <Stack mt="md">
                      <ReturnSection assets={myAssets} />
                    </Stack>
                  </InfiniteScroll>
                )}
              </ScrollArea>
            </Tabs.Panel>
          </Stack>
        </Tabs>
      </Container>
      <BottomTabs />
    </>
  );
};

export default BastPage;
