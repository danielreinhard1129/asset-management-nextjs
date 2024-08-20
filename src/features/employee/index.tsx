import DashboardWrapper from "@/components/DashboardWrapper";

const EmployeesPage = () => {
  return (
    <DashboardWrapper
      title="Employees"
      links={[
        { title: "Dashboard", href: "/" },
        { title: "Employees", href: "/dashboard/employees" },
      ]}
    ></DashboardWrapper>
  );
};

export default EmployeesPage;
