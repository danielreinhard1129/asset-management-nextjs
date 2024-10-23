import DashboardWrapper from "@/components/DashboardWrapper";

const AccountsPage = () => {
  return (
    <DashboardWrapper
      title="Accounts"
      links={[
        { title: "Master Data", href: "" },
        { title: "Accounts", href: "/dashboard/accounts" },
      ]}
    ></DashboardWrapper>
  );
};

export default AccountsPage;
