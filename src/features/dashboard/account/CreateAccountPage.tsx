import DashboardWrapper from "@/components/DashboardWrapper";
import AccountFormCreate from "./components/AccountFormCreate";

const CreateAccountPage = () => {
  return (
    <DashboardWrapper
      title="Accounts"
      links={[
        { title: "Master Data", href: "" },
        { title: "Accounts", href: "/dashboard/accounts" },
        { title: "Create", href: "" },
      ]}
    >
      <AccountFormCreate />
    </DashboardWrapper>
  );
};

export default CreateAccountPage;
