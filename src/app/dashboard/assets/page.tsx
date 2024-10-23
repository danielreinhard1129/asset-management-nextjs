import AssetsPage from "@/features/dashboard/asset";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

const Assets = async () => {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    return notFound();
  }
  return <AssetsPage />;
};

export default Assets;
