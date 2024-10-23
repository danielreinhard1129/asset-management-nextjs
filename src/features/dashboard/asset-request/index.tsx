

import DashboardWrapper from "@/components/DashboardWrapper";
import AssetRequestList from "./components/AssetRequestList";

const AssetRequestPage = () => {
  return (
    <DashboardWrapper
      title="Asset Request"
      links={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "Assets Request", href: "/dashboard/asset-requests" },
      ]}
    >
      <AssetRequestList />
    </DashboardWrapper>
  );
};

export default AssetRequestPage;
