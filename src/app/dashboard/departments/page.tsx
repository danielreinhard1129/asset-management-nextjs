import DepartmentsPage from "@/features/department";

const Departments = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  return (
    <DepartmentsPage page={searchParams.page} search={searchParams.search} />
  );
};

export default Departments;
