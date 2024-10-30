"use client";

import DashboardEmpty from "@/components/DashboardEmpty";
import DashboardLoader from "@/components/DashboardLoader";
import { Container, Stack, Text } from "@mantine/core";
import { format } from "date-fns";
import { FC } from "react";
import { useGetNotification } from "../api/useGetNotification";

interface NotificationBodyProps {
  notificationId: number;
}

const NotificationBody: FC<NotificationBodyProps> = ({ notificationId }) => {
  const { data: notification, isPending } = useGetNotification(notificationId);

  if (isPending) {
    return <DashboardLoader h="40vh" />;
  }

  if (!notification) {
    return <DashboardEmpty message="No Data" h="40vh" />;
  }

  return (
    <Container>
      <Stack mt="md" gap={4}>
        <Text fw="bold" fz="h4">
          {notification.title}
        </Text>
        <Text fw="lighter" fz="sm" mb="sm">
          {format(notification.readAt, "dd MMM yyyy - hh:mm")}
        </Text>
        <Text>{notification.description}</Text>
      </Stack>
    </Container>
  );
};

export default NotificationBody;
