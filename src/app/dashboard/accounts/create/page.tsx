import CreateAccountPage from "@/features/dashboard/account/CreateAccountPage";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

const CreateAccount = async () => {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    return notFound();
  }
  return <CreateAccountPage />;
};

export default CreateAccount;
