"use client";

import DashboardEmpty from "@/components/DashboardEmpty";
import DashboardLoader from "@/components/DashboardLoader";
import { Box, Container, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetInfiniteNotifications } from "../api/useGetInfiniteNotifications";
import { useReadNotification } from "../api/useReadNotification";
import NotificationCard from "./NotificationCard";

const DATA_LIMIT = 10;

const NotificationList = () => {
  const router = useRouter();

  const {
    data: response,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteNotifications({});

  const { mutateAsync: readNotification } = useReadNotification();

  const notifications = response?.pages.flatMap((page) => page.data);

  const onClickNotificationCard = (id: number, isRead: boolean) => {
    if (!isRead) {
      readNotification(id);
    }
    router.push(`/notifications/${id}`);
  };

  if (isPending) {
    return <DashboardLoader h="50vh" />;
  }

  if (!notifications?.length) {
    return <DashboardEmpty message="No Data" h="50vh" />;
  }

  return (
    <Container>
      <InfiniteScroll
        dataLength={notifications.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={isFetchingNextPage && <DashboardLoader />}
        endMessage={
          notifications.length > DATA_LIMIT - 1 && (
            <Text ta="center" fz="sm">
              You have reached the end of the page.
            </Text>
          )
        }
      >
        <Box mt="md">
          {notifications.map((notification) => {
            return (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onClick={() =>
                  onClickNotificationCard(
                    notification.id,
                    !!notification.readAt
                  )
                }
              />
            );
          })}
        </Box>
      </InfiniteScroll>
    </Container>
  );
};

export default NotificationList;
