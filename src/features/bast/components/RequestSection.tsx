import { Button, Stack, Text, Textarea } from "@mantine/core";
import { FC } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import { AssetRequestSchemaType } from "../schemas";
import BastRequestCard from "./BastRequestCard";
import { useCreateAssetRequestMutation } from "@/features/asset-request/api/useCreateAssetRequest";

interface RequestSectionProps {
  categories: any[];
  assetCategoryRequestCart: { id: number; qty: number }[];
  handleAddToCart: (id: number) => void;
  handleClearCart: () => void;
  handleRemoveFromCart: (id: number) => void;
}

const RequestSection: FC<RequestSectionProps> = ({
  categories,
  assetCategoryRequestCart,
  handleAddToCart,
  handleClearCart,
  handleRemoveFromCart,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormContext<AssetRequestSchemaType>();

  const { mutateAsync: createAssetRequest, isPending } =
    useCreateAssetRequestMutation();

  const onSubmit: SubmitHandler<AssetRequestSchemaType> = async (values) => {
    if (!assetCategoryRequestCart.length) {
      return toast.error("Asset category cannot be empty!");
    }
    await createAssetRequest({ ...values, items: assetCategoryRequestCart });
    handleClearCart();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack mt="md" gap="sm">
        {categories.map((category) => (
          <BastRequestCard
            key={category.id}
            assetCategoryRequestCart={assetCategoryRequestCart}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
            {...category}
          />
        ))}
      </Stack>
      <Stack mt="xl">
        <Text fz="sm" fw="bold">
          Masukan nama penerima perangkat
        </Text>
        <Textarea
          rows={3}
          placeholder="Contoh: Jack"
          {...register("assignToUser")}
          error={errors.assignToUser?.message}
        />
        <Button type="submit" fullWidth loading={isPending}>
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default RequestSection;
