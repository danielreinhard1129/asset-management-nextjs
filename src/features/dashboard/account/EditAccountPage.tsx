import DashboardWrapper from "@/components/DashboardWrapper";
import { FC } from "react";
import AccountFormEdit from "./components/AccountFormEdit";

interface EditAccountPageProps {
  userId: number;
}

const EditAccountPage: FC<EditAccountPageProps> = ({ userId }) => {
  return (
    <DashboardWrapper
      title="Accounts"
      links={[
        { title: "Master Data", href: "" },
        { title: "Accounts", href: "/dashboard/accounts" },
        { title: "Edit", href: "" },
      ]}
    >
      <AccountFormEdit userId={userId} />
    </DashboardWrapper>
  );
};

export default EditAccountPage;
