import DashboardUserWrapper from "@/components/DashboardUserWrapper";
import ScanPage from "@/features/scan";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

const Scan = async () => {
  const session = await auth();

  if (session?.user.role !== "USER") {
    return notFound();
  }
  return (
    <DashboardUserWrapper>
      <ScanPage />
    </DashboardUserWrapper>
  );
};

export default Scan;
