import DashboardWrapper from "@/components/DashboardWrapper";
import AssetFormCreate from "./components/AssetFormCreate";

const CreateAssetPage = () => {
  return (
    <DashboardWrapper
      title="Assets"
      links={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "Assets", href: "/dashboard/assets" },
        { title: "Create", href: "/dashboard/assets/create" },
      ]}
    >
      <AssetFormCreate />
    </DashboardWrapper>
  );
};

export default CreateAssetPage;
