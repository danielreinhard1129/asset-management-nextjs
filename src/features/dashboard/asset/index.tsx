import DashboardWrapper from "@/components/DashboardWrapper";
import AssetList from "./components/AssetList";

const AssetsPage = () => {
  return (
    <DashboardWrapper
      title="Assets"
      links={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "Assets", href: "/dashboard/assets" },
      ]}
    >
      <AssetList />
    </DashboardWrapper>
  );
};

export default AssetsPage;
