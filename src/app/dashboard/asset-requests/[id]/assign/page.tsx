import AssetRequestAssignPage from "@/features/dashboard/asset-request/AssetRequestAssignPage";

const AssetRequestAssign = ({ params }: { params: { id: string } }) => {
  return <AssetRequestAssignPage assetRequestId={Number(params.id)} />;
};

export default AssetRequestAssign;
