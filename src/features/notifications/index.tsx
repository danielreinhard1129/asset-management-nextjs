import BottomTabs from "@/components/BottomTabs";
import DashboardHeader from "@/components/DashboardHeader";
import NotificationList from "./components/NotificationList";

const NotificationsPage = () => {
  return (
    <>
      <DashboardHeader href="/" title="Notifications" />
      <NotificationList />
      <BottomTabs />
    </>
  );
};

export default NotificationsPage;
