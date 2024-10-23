import DepartmentsPage from "@/features/dashboard/department";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

const Departments = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    return notFound();
  }
  return (
    <DepartmentsPage page={searchParams.page} search={searchParams.search} />
  );
};

export default Departments;
