import CreateAssetPage from "@/features/dashboard/asset/CreateAssetPage";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

const CreateAsset = async () => {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    return notFound();
  }
  return <CreateAssetPage />;
};

export default CreateAsset;
