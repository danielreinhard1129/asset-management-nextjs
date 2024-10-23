import DashboardUserWrapper from "@/components/DashboardUserWrapper";
import HomepageUser from "@/features/home";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session?.user.role !== "USER") {
    return notFound();
  }

  return (
    <DashboardUserWrapper>
      <HomepageUser />
    </DashboardUserWrapper>
  );
}
