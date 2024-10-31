"use client";

import DashboardEmpty from "@/components/DashboardEmpty";
import DashboardLoader from "@/components/DashboardLoader";
import DashboardWrapper from "@/components/DashboardWrapper";
import { StatusAssetRequest } from "@/features/asset-request/types";
import { StatusAssetReturned } from "@/features/asset-return/types";
import { TypeBast } from "@/features/bast/types";
import { Box } from "@mantine/core";
import dynamic from "next/dynamic";
import { FC } from "react";
import useGetBastByBastNo from "./api/useGetBastByBastNo";

const BastPdfViewer = dynamic(() => import("./components/BastPdfViewer"), {
  ssr: false,
});

interface BastPageProps {
  bastNo: string;
}

const BastPage: FC<BastPageProps> = ({ bastNo }) => {
  const { data: bast, isPending } = useGetBastByBastNo(bastNo);

  if (isPending) {
    return <DashboardLoader h="40vh" />;
  }

  if (!bast) {
    return <DashboardEmpty message="No Data" h="40vh" />;
  }

  if (bast.type === TypeBast.REQUEST) {
    if (bast.assetRequests[0].status !== StatusAssetRequest.APPROVE) {
      return <DashboardEmpty message="No Data" h="40vh" />;
    }
  } else {
    if (bast.assetReturned[0].status !== StatusAssetReturned.DONE) {
      return <DashboardEmpty message="No Data" h="40vh" />;
    }
  }
  return (
    <DashboardWrapper
      title="BAST"
      links={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "BAST", href: "" },
      ]}
    >
      <Box h="90vh">
        <BastPdfViewer bast={bast} />
      </Box>
    </DashboardWrapper>
  );
};

export default BastPage;
