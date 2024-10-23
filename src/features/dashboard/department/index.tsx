import DashboardWrapper from "@/components/DashboardWrapper";
import { FC } from "react";
import DepartmentList from "./components/DepartmentList";

interface DepartmensPageProps {
  page: string | undefined;
  search: string | undefined;
}

const DepartmentsPage: FC<DepartmensPageProps> = ({ page, search }) => {
  return (
    <DashboardWrapper
      title="Departments"
      links={[
        { title: "Master Data", href: "" },
        { title: "Departments", href: "" },
      ]}
    >
      <DepartmentList page={page} search={search} />
    </DashboardWrapper>
  );
};

export default DepartmentsPage;
