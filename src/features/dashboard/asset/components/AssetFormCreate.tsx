"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { DateInput } from "@mantine/dates";
import { IconUpload } from "@tabler/icons-react";
import { Controller, useForm } from "react-hook-form";
import useGetCategories from "../../category/api/useGetCategories";
import { CreateAssetSchema, CreateAssetSchemaType } from "../schemas";
import { useCreateAsset } from "../api/useCreateAsset";

const AssetFormCreate = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateAssetSchemaType>({
    resolver: zodResolver(CreateAssetSchema),
  });

  const { data: categories, isPending: isPendingGetCategories } =
    useGetCategories({ all: true });

  const { mutateAsync: createAsset, isPending: isPendingCreateAsset } =
    useCreateAsset();

  const onSubmit = async (data: CreateAssetSchemaType) => {
    await createAsset(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button type="submit" loading={isPendingCreateAsset}>
          Submit
        </Button>
      </Group>
    </form>
  );
};

export default AssetFormCreate;
