import CreateAssetCategoryPage from "@/features/dashboard/asset-category/CreateAssetCategoryPage";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

const CreateAssetCategory = async () => {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    return notFound();
  }

  return <CreateAssetCategoryPage />;
};

export default CreateAssetCategory;
