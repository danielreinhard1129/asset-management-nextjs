import AssetRequestDetailPage from "@/features/dashboard/asset-request/AssetRequestDetailPage";

const AssetRequestDetail = ({ params }: { params: { id: string } }) => {
  return <AssetRequestDetailPage assetRequestId={Number(params.id)} />;
};

export default AssetRequestDetail;
