import DashboardWrapper from "@/components/DashboardWrapper";
import AccountList from "./components/AccountList";

const AccountsPage = () => {
  return (
    <DashboardWrapper
      title="Accounts"
      links={[
        { title: "Master Data", href: "" },
        { title: "Accounts", href: "/dashboard/accounts" },
      ]}
    >
      <AccountList />
    </DashboardWrapper>
  );
};

export default AccountsPage;
