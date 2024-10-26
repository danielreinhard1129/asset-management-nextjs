"use client";

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
import { Controller, useForm } from "react-hook-form";
import { useCreateCategory } from "../api/useCreateCategory";
import {
  CreateAssetCategorySchema,
  CreateAssetCategorySchemaType,
} from "../schemas";

const AssetCategoryFormCreate = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateAssetCategorySchemaType>({
    resolver: zodResolver(CreateAssetCategorySchema),
  });

  const { mutateAsync: createCategory, isPending: isPendingCreateCategory } =
    useCreateCategory();

  const onSubmit = async (data: CreateAssetCategorySchemaType) => {
    await createCategory(data);
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
                  placeholder="Upload Category Image"
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
        <Button type="submit" loading={isPendingCreateCategory}>
          Submit
        </Button>
      </Group>
    </form>
  );
};

export default AssetCategoryFormCreate;
