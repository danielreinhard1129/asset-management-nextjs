"use client";

import DashboardWrapper from "@/components/DashboardWrapper";
import { Box } from "@mantine/core";
import dynamic from "next/dynamic";
import { FC } from "react";

const BastPdf = dynamic(() => import("../bast/components/BastPdf"), {
  ssr: false,
});

interface BastPageProps {
  bastNo: string;
}

const BastPage: FC<BastPageProps> = ({ bastNo }) => {
  return (
    <DashboardWrapper
      title="BAST"
      links={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "BAST", href: "" },
      ]}
    >
      <Box h="90vh">
        <BastPdf bastNo={bastNo} />
      </Box>
    </DashboardWrapper>
  );
};

export default BastPage;
