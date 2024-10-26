import DashboardWrapper from "@/components/DashboardWrapper";
import AssetCategoryFormCreate from "./components/AssetCategoryFormCreate";

const CreateAssetCategoryPage = () => {
  return (
    <DashboardWrapper
      title="Asset Categories"
      links={[
        { title: "Master Data", href: "" },
        { title: "Asset Categories", href: "/dashboard/asset-categories" },
        { title: "Create", href: "" },
      ]}
    >
      <AssetCategoryFormCreate />
    </DashboardWrapper>
  );
};

export default CreateAssetCategoryPage;
