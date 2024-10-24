import DashboardUserWrapper from "@/components/DashboardUserWrapper";
import AssetReturnDetailPage from "@/features/asset-return/AssetReturnDetailPage";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

const AssetReturnDetail = async ({ params }: { params: { id: string } }) => {
  const session = await auth();

  if (session?.user.role !== "USER") {
    return notFound();
  }

  return (
    <DashboardUserWrapper>
      <AssetReturnDetailPage assetReturnId={Number(params.id)} />
    </DashboardUserWrapper>
  );
};

export default AssetReturnDetail;
