import DashboardEmpty from "@/components/DashboardEmpty";
import DashboardLoader from "@/components/DashboardLoader";
import { useGetInfiniteAssetReturned } from "@/features/asset-return/api/useGetInfiniteAssetReturned";
import { Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import BastReturnCard from "./BastReturnCard";

interface AssetReturnedListProps {
  search: string;
}

const DATA_LIMIT = 10;

const AssetReturnedList: FC<AssetReturnedListProps> = ({ search }) => {
  const router = useRouter();

  const {
    data: response,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteAssetReturned({
    myReturn: true,
    take: DATA_LIMIT,
    search,
  });

  const myReturns = response?.pages.flatMap((page) => page.data);

  if (isPending) {
    return <DashboardLoader h="50vh" />;
  }

  if (!myReturns?.length) {
    return <DashboardEmpty message="No Data" h="50vh" />;
  }
  return (
    <InfiniteScroll
      dataLength={myReturns.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={isFetchingNextPage && <DashboardLoader />}
      endMessage={
        myReturns.length > DATA_LIMIT - 1 && (
          <Text ta="center" fz="sm">
            You have reached the end of the page.
          </Text>
        )
      }
    >
      <Stack>
        {myReturns.map((assetReturned, idx) => (
          <BastReturnCard
            key={idx}
            assetReturned={assetReturned}
            // onClick={() => router.push(`/asset-requests/${assetRequest.id}`)}
          />
        ))}
      </Stack>
    </InfiniteScroll>
  );
};

export default AssetReturnedList;
