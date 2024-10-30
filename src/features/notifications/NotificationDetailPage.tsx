import BottomTabs from "@/components/BottomTabs";
import DashboardHeader from "@/components/DashboardHeader";
import NotificationBody from "./components/NotificationBody";
import { FC } from "react";

interface NotificationDetailPageProps {
  notificationId: number;
}

const NotificationDetailPage: FC<NotificationDetailPageProps> = ({
  notificationId,
}) => {
  return (
    <>
      <DashboardHeader href="/notifications" title="Notification Detail" />
      <NotificationBody notificationId={notificationId} />
      <BottomTabs />
    </>
  );
};

export default NotificationDetailPage;
