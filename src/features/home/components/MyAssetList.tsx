import DashboardLoader from "@/components/DashboardLoader";
import { useGetInfiniteAssets } from "@/features/asset/api/useGetInfiniteAssets";
import { Stack, Text } from "@mantine/core";
import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AssetCard from "./AssetCard";
import DashboardEmpty from "@/components/DashboardEmpty";
import { useRouter } from "next/navigation";

interface MyAssetListProps {
  search: string;
}

const DATA_LIMIT = 10;

const MyAssetList: FC<MyAssetListProps> = ({ search }) => {
  const router = useRouter();

  const {
    data: response,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteAssets({ myAsset: true, take: DATA_LIMIT, search });

  const myAssets = response?.pages.flatMap((page) => page.data);

  if (isPending) {
    return <DashboardLoader h="50vh" />;
  }

  if (!myAssets?.length) {
    return <DashboardEmpty message="No Data" h="50vh" />;
  }

  return (
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
      <Stack>
        {myAssets.map((asset, idx) => (
          <AssetCard
            key={idx}
            asset={asset}
            onClick={() => router.push(`/assets/${asset.id}`)}
          />
        ))}
      </Stack>
    </InfiniteScroll>
  );
};

export default MyAssetList;
