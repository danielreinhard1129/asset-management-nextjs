import DashboardUserWrapper from "@/components/DashboardUserWrapper";
import AssetDetailPage from "@/features/asset/AssetDetailPage";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

const AssetDetail = async ({ params }: { params: { id: string } }) => {
  const session = await auth();

  if (session?.user.role !== "USER") {
    return notFound();
  }
  return (
    <DashboardUserWrapper>
      <AssetDetailPage assetId={Number(params.id)} />
    </DashboardUserWrapper>
  );
};

export default AssetDetail;
