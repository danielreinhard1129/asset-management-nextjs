"use client";

import DashboardWrapper from "@/components/DashboardWrapper";
import { Box } from "@mantine/core";
import { FC } from "react";
import dynamic from "next/dynamic";

// const BastPdf = dynamic(() => import("../bast/components/BastPdf"), { ssr: false });

interface AssetRequestDetailPageProps {
  assetRequestId: number;
}

const AssetRequestDetailPage: FC<AssetRequestDetailPageProps> = ({
  assetRequestId,
}) => {
  return (
    <DashboardWrapper
      title="Detail"
      links={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "Assets Request", href: "/dashboard/asset-requests" },
        { title: "Detail", href: "" },
      ]}
    >
      <Box h="90vh">
        {/* <BastPdf /> */}
      </Box>
    </DashboardWrapper>
  );
};

export default AssetRequestDetailPage;
