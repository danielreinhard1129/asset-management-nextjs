import DashboardWrapper from "@/components/DashboardWrapper";
import { FC } from "react";
import AssetCategoryFormEdit from "./components/AssetCategoryFormEdit";

interface EditAssetCategoryPageProps {
  categoryId: number;
}

const EditAssetCategoryPage: FC<EditAssetCategoryPageProps> = ({
  categoryId,
}) => {
  return (
    <DashboardWrapper
      title="Asset Categories"
      links={[
        { title: "Master Data", href: "" },
        { title: "Asset Categories", href: "/dashboard/asset-categories" },
        { title: "Edit", href: "" },
      ]}
    >
      <AssetCategoryFormEdit categoryId={categoryId} />
    </DashboardWrapper>
  );
};

export default EditAssetCategoryPage;
