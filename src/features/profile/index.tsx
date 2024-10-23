"use client";

import BottomTabs from "@/components/BottomTabs";
import { signOut } from "next-auth/react";

const ProfilePage = () => {
  return (
    <>
      <div>
        ProfilePage
        <button onClick={() => signOut()}>logout</button>
      </div>
      <BottomTabs />
    </>
  );
};

export default ProfilePage;
