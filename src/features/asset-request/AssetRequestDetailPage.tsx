"use client";

import DashboardEmpty from "@/components/DashboardEmpty";
import DashboardHeader from "@/components/DashboardHeader";
import { Container, Divider } from "@mantine/core";
import { useSession } from "next-auth/react";
import { FC } from "react";
import useGetAssetRequest from "../dashboard/asset-request/api/useGetAssetRequest";
import AssetRequestInfo from "./components/AssetRequestInfo";

interface AssetRequestDetailPageProps {
  assetRequestId: number;
}

const AssetRequestDetailPage: FC<AssetRequestDetailPageProps> = ({
  assetRequestId,
}) => {
  const { data } = useSession();
  const { data: assetRequest } = useGetAssetRequest(assetRequestId);

  const isEmpty =
    !assetRequest || assetRequest.userId !== Number(data?.user.id);

  return (
    <Container style={{ height: "90vh" }}>
      <DashboardHeader href="/" title="Asset Request Info" />
      <Divider mt="lg" />
      {isEmpty && <DashboardEmpty message="No Data" h="30vh" />}
      {assetRequest && <AssetRequestInfo assetRequest={assetRequest} />}
    </Container>
  );
};

export default AssetRequestDetailPage;
