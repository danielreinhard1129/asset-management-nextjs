import AssetCategoriesPage from "@/features/dashboard/asset-category";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

const AssetCategories = async () => {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    return notFound();
  }
  return <AssetCategoriesPage />;
};

export default AssetCategories;
