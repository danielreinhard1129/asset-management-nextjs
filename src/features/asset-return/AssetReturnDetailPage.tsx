"use client";

import DashboardHeader from "@/components/DashboardHeader";
import { Container, Divider } from "@mantine/core";
import { useSession } from "next-auth/react";
import useGetAssetReturn from "./api/useGetAssetReturn";
import { FC } from "react";
import DashboardEmpty from "@/components/DashboardEmpty";
import AssetReturnInfo from "./components/AssetReturnInfo";

interface AssetReturnDetailPageProps {
  assetReturnId: number;
}

const AssetReturnDetailPage: FC<AssetReturnDetailPageProps> = ({
  assetReturnId,
}) => {
  const { data } = useSession();
  const { data: assetReturn } = useGetAssetReturn(assetReturnId);

  const isEmpty = !assetReturn || assetReturn.userId !== Number(data?.user.id);

  return (
    <Container style={{ height: "90vh" }}>
      <DashboardHeader href="/" title="Asset Return Info" />
      <Divider mt="lg" />
      {isEmpty && <DashboardEmpty message="No Data" h="30vh" />}
      {assetReturn && <AssetReturnInfo assetReturn={assetReturn} />}
    </Container>
  );
};

export default AssetReturnDetailPage;
