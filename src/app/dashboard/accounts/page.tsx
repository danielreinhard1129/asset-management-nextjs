import AccountsPage from "@/features/dashboard/account";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

const Accounts = async () => {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    return notFound();
  }
  return <AccountsPage />;
};

export default Accounts;
