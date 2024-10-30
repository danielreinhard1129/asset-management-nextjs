import DashboardUserWrapper from "@/components/DashboardUserWrapper";
import NotificationDetailPage from "@/features/notifications/NotificationDetailPage";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

const NotificationDetail = async ({ params }: { params: { id: string } }) => {
  const session = await auth();

  if (session?.user.role !== "USER") {
    return notFound();
  }
  return (
    <DashboardUserWrapper>
      <NotificationDetailPage notificationId={Number(params.id)} />
    </DashboardUserWrapper>
  );
};

export default NotificationDetail;
