import EditAssetPage from "@/features/dashboard/asset/EditAssetPage";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

const EditAsset = async ({ params }: { params: { id: string } }) => {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    return notFound();
  }

  return <EditAssetPage assetId={Number(params.id)} />;
};

export default EditAsset;
