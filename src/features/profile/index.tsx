import BottomTabs from "@/components/BottomTabs";
import ProfileHeader from "./components/ProfileHeader";
import ProfileListButton from "./components/ProfileListButton";

const ProfilePage = () => {
  return (
    <>
      <ProfileHeader />
      <ProfileListButton />
      <BottomTabs />
    </>
  );
};

export default ProfilePage;
