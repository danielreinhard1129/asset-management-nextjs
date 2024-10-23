"use client";

import BottomTabs from "@/components/BottomTabs";
import DashboardHeader from "@/components/DashboardHeader";
import { Box, Container } from "@mantine/core";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ScanPage = () => {
  const router = useRouter();
  const [selectedAssetId, setSelectedAssetId] = useState("");

  useEffect(() => {
    if (selectedAssetId) {
      router.push(`/assets/${selectedAssetId}`);
      setSelectedAssetId("");
    }
  }, [selectedAssetId]);

  return (
    <>
      <Container>
        <DashboardHeader href="/" title="Scan QR" />
        <Box mt="xl">
          <Scanner
            onScan={(result) => setSelectedAssetId(result[0].rawValue)}
            onError={() => toast.error("Scan QR Failed")}
            constraints={{ facingMode: "environment" }}
          />
        </Box>
      </Container>
      <BottomTabs />
    </>
  );
};

export default ScanPage;
