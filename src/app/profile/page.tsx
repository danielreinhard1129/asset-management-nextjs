import DashboardUserWrapper from "@/components/DashboardUserWrapper";
import ProfilePage from "@/features/profile";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

const Profile = async () => {
  const session = await auth();

  if (session?.user.role !== "USER") {
    return notFound();
  }
  return (
    <DashboardUserWrapper>
      <ProfilePage />
    </DashboardUserWrapper>
  );
};

export default Profile;
