"use client";

import DashboardEmpty from "@/components/DashboardEmpty";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  FileInput,
  Grid,
  Group,
  rem,
  Stack,
  TextInput,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import useGetCategory from "../api/useGetCategory";
import useUpdateCategory from "../api/useUpdateCategory";
import {
  UpdateAssetCategorySchema,
  UpdateAssetCategorySchemaType,
} from "../schemas";

interface AssetCategoryFormEditProps {
  categoryId: number;
}

const AssetCategoryFormEdit: FC<AssetCategoryFormEditProps> = ({
  categoryId,
}) => {
  const { data: category } = useGetCategory(categoryId);

  const { mutateAsync: updateCategory, isPending: isPendingUpdateCategory } =
    useUpdateCategory(categoryId);

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateAssetCategorySchemaType>({
    resolver: zodResolver(UpdateAssetCategorySchema),
  });

  useEffect(() => {
    if (category) {
      reset({
        name: category.name || "",
        image: undefined,
      });
    }
  }, [category, reset]);

  if (!category) {
    return <DashboardEmpty message="No Data" h="30vh" />;
  }

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        updateCategory(values);
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
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack>
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
        <Button type="submit" loading={isPendingUpdateCategory}>
          Submit
        </Button>
      </Group>
    </form>
  );
};

export default AssetCategoryFormEdit;
