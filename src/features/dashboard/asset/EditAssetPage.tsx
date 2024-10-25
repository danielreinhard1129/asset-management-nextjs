import DashboardWrapper from "@/components/DashboardWrapper";
import { FC } from "react";
import AssetFormEdit from "./components/AssetFormEdit";

interface EditAssetPageProps {
  assetId: number;
}

const EditAssetPage: FC<EditAssetPageProps> = ({ assetId }) => {
  return (
    <DashboardWrapper
      title="Edit"
      links={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "Assets", href: "/dashboard/assets" },
        { title: "Edit", href: "" },
      ]}
    >
      <AssetFormEdit assetId={assetId} />
    </DashboardWrapper>
  );
};

export default EditAssetPage;
