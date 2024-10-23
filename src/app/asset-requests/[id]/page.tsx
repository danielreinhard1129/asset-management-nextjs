import DashboardUserWrapper from "@/components/DashboardUserWrapper";
import AssetRequestDetailPage from "@/features/asset-request/AssetRequestDetailPage";

const AssetRequestDetail = ({ params }: { params: { id: string } }) => {
  return (
    <DashboardUserWrapper>
      <AssetRequestDetailPage assetRequestId={Number(params.id)} />
    </DashboardUserWrapper>
  );
};

export default AssetRequestDetail;
