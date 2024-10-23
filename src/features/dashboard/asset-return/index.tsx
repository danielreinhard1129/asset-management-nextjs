import DashboardWrapper from "@/components/DashboardWrapper";
import AssetReturnList from "./components/AssetReturnList";

const AssetReturnedPage = () => {
  return (
    <DashboardWrapper
      title="Asset Returned"
      links={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "Asset Returned", href: "/dashboard/asset-returned" },
      ]}
    >
      <AssetReturnList />
    </DashboardWrapper>
  );
};

export default AssetReturnedPage;
