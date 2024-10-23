import DashboardEmpty from "@/components/DashboardEmpty";
import DashboardLoader from "@/components/DashboardLoader";
import { useGetInfiniteAssetRequests } from "@/features/asset-request/api/useGetInfiniteAssetRequest";
import { Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import BastRequestCard from "./BastRequestCard";

interface AssetRequestListProps {
  search: string;
}

const DATA_LIMIT = 10;

const AssetRequestList: FC<AssetRequestListProps> = ({ search }) => {
  const router = useRouter();

  const {
    data: response,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteAssetRequests({
    myRequest: true,
    take: DATA_LIMIT,
    search,
  });

  const myRequests = response?.pages.flatMap((page) => page.data);

  if (isPending) {
    return <DashboardLoader h="50vh" />;
  }

  if (!myRequests?.length) {
    return <DashboardEmpty message="No Data" h="50vh" />;
  }

  return (
    <InfiniteScroll
      dataLength={myRequests.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={isFetchingNextPage && <DashboardLoader />}
      endMessage={
        myRequests.length > DATA_LIMIT - 1 && (
          <Text ta="center" fz="sm">
            You have reached the end of the page.
          </Text>
        )
      }
    >
      <Stack>
        {myRequests.map((assetRequest, idx) => (
          <BastRequestCard
            key={idx}
            assetRequest={assetRequest}
            onClick={() => router.push(`/asset-requests/${assetRequest.id}`)}
          />
        ))}
      </Stack>
    </InfiniteScroll>
  );
};

export default AssetRequestList;
