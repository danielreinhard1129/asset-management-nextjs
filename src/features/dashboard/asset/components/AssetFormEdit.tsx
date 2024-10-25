"use client";

import {
  Button,
  FileInput,
  Grid,
  Group,
  rem,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { UpdateAssetSchema, UpdateAssetSchemaType } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import useGetCategories from "../../category/api/useGetCategories";
import { DateInput } from "@mantine/dates";
import { IconUpload } from "@tabler/icons-react";
import { useGetAsset } from "@/features/asset/api/useGetAsset";
import DashboardEmpty from "@/components/DashboardEmpty";
import useUpdateAsset from "../api/useUpdateAsset";
import { Status } from "../types";

interface AssetFormEditProps {
  assetId: number;
}

const AssetFormEdit: FC<AssetFormEditProps> = ({ assetId }) => {
  const { data: asset } = useGetAsset(assetId);
  const { data: categories, isPending: isPendingGetCategories } =
    useGetCategories({ all: true });
  const { mutateAsync: updateAsset, isPending: isPendingUpdateAsset } =
    useUpdateAsset(assetId);

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateAssetSchemaType>({
    resolver: zodResolver(UpdateAssetSchema),
  });

  useEffect(() => {
    if (asset) {
      reset({
        name: asset.name || "",
        categoryId: asset.categoryId?.toString(),
        purchaseDate: new Date(asset.purchaseDate) || undefined,
        purchasePrice: asset.purchasePrice?.toString(),
        serial: asset.serial || "",
        image: undefined,
        status: asset.status,
      });
    }
  }, [asset, reset]);

  if (!asset) {
    return <DashboardEmpty message="No Data" h="30vh" />;
  }

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        updateAsset(values);
      })}
    >
      <Grid>
        <Grid.Col span={6}>
          <Stack>
            <TextInput
              label="Name"
              placeholder="Name"
              {...register("name")}
              error={errors.name?.message}
            />
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Category"
                  placeholder="Select a category"
                  searchable
                  disabled={isPendingGetCategories || !categories}
                  data={categories?.data.map((category) => ({
                    value: String(category.id),
                    label: category.name,
                  }))}
                  error={errors.categoryId?.message}
                />
              )}
            />

            <TextInput
              label="Serial"
              placeholder="Serial"
              {...register("serial")}
              error={errors.serial?.message}
            />
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Status"
                  placeholder="Select a status"
                  searchable
                  data={Object.values(Status).map((status) => status)}
                  error={errors.categoryId?.message}
                />
              )}
            />
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack>
            <Controller
              name="purchaseDate"
              control={control}
              render={({ field }) => (
                <DateInput
                  {...field}
                  label="Purchase Date"
                  placeholder="Select purchase date"
                  error={errors.purchaseDate?.message}
                />
              )}
            />
            <TextInput
              label="Purchase Price"
              placeholder="Purchase Price"
              type="number"
              inputMode="decimal"
              {...register("purchasePrice")}
              error={errors.purchasePrice?.message}
            />

            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <FileInput
                  {...field}
                  label="Image"
                  placeholder="Upload Asset Image"
                  clearable
                  accept="image/jpeg,image/png,image/jpg,image/heic,image/avif"
                  leftSection={
                    <IconUpload style={{ width: rem(14), height: rem(14) }} />
                  }
                  error={errors.image?.message}
                />
              )}
            />
          </Stack>
        </Grid.Col>
      </Grid>
      <Group justify="right" mt="lg">
        <Button type="submit" loading={isPendingUpdateAsset}>
          Submit
        </Button>
      </Group>
    </form>
  );
};

export default AssetFormEdit;
