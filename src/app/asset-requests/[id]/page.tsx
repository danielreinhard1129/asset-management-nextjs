import DashboardUserWrapper from "@/components/DashboardUserWrapper";
import AssetRequestDetailPage from "@/features/asset-request/AssetRequestDetailPage";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

const AssetRequestDetail = async ({ params }: { params: { id: string } }) => {
  const session = await auth();

  if (session?.user.role !== "USER") {
    return notFound();
  }
  return (
    <DashboardUserWrapper>
      <AssetRequestDetailPage assetRequestId={Number(params.id)} />
    </DashboardUserWrapper>
  );
};

export default AssetRequestDetail;
