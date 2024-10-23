"use client";

import DashboardWrapper from "@/components/DashboardWrapper";
import { Divider, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import { FC } from "react";
import useGetAssetRequest from "./api/useGetAssetRequest";
import AssetAssignSection from "./components/AssetAssignSection";
import AssetRequestInfo from "./components/AssetRequestInfo";
import DashboardLoader from "@/components/DashboardLoader";
import DashboardEmpty from "@/components/DashboardEmpty";

interface AssetRequestAssignPageProps {
  assetRequestId: number;
}

const AssetRequestAssignPage: FC<AssetRequestAssignPageProps> = ({
  assetRequestId,
}) => {
  const { data: assetRequest, isPending } = useGetAssetRequest(assetRequestId);
  const router = useRouter();

  if (isPending) {
    return <DashboardLoader h="50vh" />;
  }

  if (!assetRequest) {
    return <DashboardEmpty message="No Data" />;
  }

  if (assetRequest.bast.adminId || !assetRequest.bast.hrId) {
    router.replace("/dashboard/asset-requests");
  }

  return (
    <DashboardWrapper
      title="Assign"
      links={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "Assets Request", href: "/dashboard/asset-requests" },
        { title: "Assign", href: "" },
      ]}
    >
      <Stack>
        <Divider />
        <AssetRequestInfo assetRequestItems={assetRequest.assetRequestItems} />
        <AssetAssignSection assetRequestId={assetRequestId} />
      </Stack>
    </DashboardWrapper>
  );
};

export default AssetRequestAssignPage;
