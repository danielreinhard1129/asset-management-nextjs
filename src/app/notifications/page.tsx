import DashboardUserWrapper from "@/components/DashboardUserWrapper";
import NotificationsPage from "@/features/notifications";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

const Notifications = async () => {
  const session = await auth();

  if (session?.user.role !== "USER") {
    return notFound();
  }
  return (
    <DashboardUserWrapper>
      <NotificationsPage />
    </DashboardUserWrapper>
  );
};

export default Notifications;
