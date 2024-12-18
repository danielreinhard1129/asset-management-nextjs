import DashboardWrapper from "@/components/DashboardWrapper";
import React from "react";
import AssetCategoryList from "./components/AssetCategoryList";

const AssetCategoriesPage = () => {
  return (
    <DashboardWrapper
      title="Asset Categories"
      links={[
        { title: "Master Data", href: "" },
        { title: "Asset Categories", href: "/dashboard/asset-categories" },
      ]}
    >
      <AssetCategoryList />
    </DashboardWrapper>
  );
};

export default AssetCategoriesPage;
