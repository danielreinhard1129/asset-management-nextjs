"use client";

import DashboardEmpty from "@/components/DashboardEmpty";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardLoader from "@/components/DashboardLoader";
import { Container, Divider } from "@mantine/core";
import { FC } from "react";
import { useGetAsset } from "./api/useGetAsset";
import AssetBody from "./components/AssetBody";

interface AssetDetailPageProps {
  assetId: number;
}

const AssetDetailPage: FC<AssetDetailPageProps> = ({ assetId }) => {
  const { data: asset, isPending } = useGetAsset(assetId);

  if (isPending) {
    return <DashboardLoader h="100vh" />;
  }

  return (
    <Container style={{ height: "90vh" }}>
      <DashboardHeader href="/" title={asset?.name} />
      <Divider mt="lg" />
      {!asset && <DashboardEmpty message="No Asset Found" h="30vh" />}
      {asset && <AssetBody asset={asset} />}
    </Container>
  );
};

export default AssetDetailPage;
