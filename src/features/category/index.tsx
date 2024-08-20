import DashboardWrapper from "@/components/DashboardWrapper";
import React from "react";

const CategoriesPage = () => {
  return (
    <DashboardWrapper
      title="Categories"
      links={[
        { title: "Dashboard", href: "/" },
        { title: "Categories", href: "/dashboard/categories" },
      ]}
    ></DashboardWrapper>
  );
};

export default CategoriesPage;
