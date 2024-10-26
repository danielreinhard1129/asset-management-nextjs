import EditAssetCategoryPage from "@/features/dashboard/asset-category/EditAssetCategoryPage";

const EditAssetCategory = ({ params }: { params: { id: string } }) => {
  return <EditAssetCategoryPage categoryId={Number(params.id)} />;
};

export default EditAssetCategory;
