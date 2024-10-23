import DashboardWrapper from "@/components/DashboardWrapper";
import React from "react";

const AssetCategoriesPage = () => {
  return (
    <DashboardWrapper
      title="Asset Categories"
      links={[
        { title: "Master Data", href: "" },
        { title: "Asset Categories", href: "/dashboard/asset-categories" },
      ]}
    ></DashboardWrapper>
  );
};

export default AssetCategoriesPage;
