import DashboardUserWrapper from "@/components/DashboardUserWrapper";
import BastPage from "@/features/bast";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

const Bast = async () => {
  const session = await auth();

  if (session?.user.role !== "USER") {
    return notFound();
  }

  return (
    <DashboardUserWrapper>
      <BastPage />
    </DashboardUserWrapper>
  );
};

export default Bast;
