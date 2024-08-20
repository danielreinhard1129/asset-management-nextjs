import DashboardWrapper from "@/components/DashboardWrapper";

const AssetsPage = () => {
  return (
    <DashboardWrapper
      title="Assets"
      links={[
        { title: "Dashboard", href: "/" },
        { title: "Assets", href: "/dashboard/assets" },
      ]}
    ></DashboardWrapper>
  );
};

export default AssetsPage;
