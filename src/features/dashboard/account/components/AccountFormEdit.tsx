"use client";

import DashboardEmpty from "@/components/DashboardEmpty";
import { Role } from "@/features/user/types";
import { getChangedValues } from "@/utils/getChangedValues";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Grid,
  Group,
  PasswordInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import useGetDepartments from "../../department/api/useGetDepartments";
import useGetAccount from "../api/useGetAccount";
import useUpdateAccount from "../api/useUpdateAccount";
import { UpdateAccountSchema, UpdateAccountSchemaType } from "../schemas";

interface AccountFormEditProps {
  userId: number;
}

const AccountFormEdit: FC<AccountFormEditProps> = ({ userId }) => {
  const { data: account } = useGetAccount(userId);

  const { data: departments } = useGetDepartments({ all: true });

  const { mutateAsync: updateAccount, isPending } = useUpdateAccount(userId);

  const initialValues = {
    firstName: account?.firstName || "",
    lastName: account?.lastName || "",
    email: account?.email || "",
    role: account?.role || undefined,
    departmentId: account?.departmentId.toString(),
  };

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateAccountSchemaType>({
    resolver: zodResolver(UpdateAccountSchema),
  });

  useEffect(() => {
    if (account) {
      reset(initialValues);
    }
  }, [account, reset]);

  if (!account) {
    return <DashboardEmpty message="No Data" h="30vh" />;
  }

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        const changedValues = getChangedValues(values, initialValues);
        updateAccount({
          ...changedValues,
          departmentId: Number(values.departmentId),
        });
      })}
    >
      <Grid>
        <Grid.Col span={6}>
          <Stack>
            <TextInput
              label="First Name"
              placeholder="First Name"
              {...register("firstName")}
              error={errors.firstName?.message}
              required
            />
            <TextInput
              label="Last Name"
              placeholder="Last Name"
              {...register("lastName")}
              error={errors.lastName?.message}
              required
            />
            <Controller
              name="departmentId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Department"
                  placeholder="Select a department"
                  searchable
                  data={departments?.data.map((department) => ({
                    value: String(department.id),
                    label: department.name,
                  }))}
                  error={errors.role?.message}
                  required
                />
              )}
            />
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="Email"
              {...register("email")}
              error={errors.email?.message}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Password"
              {...register("password")}
              error={errors.password?.message}
            />
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Role"
                  placeholder="Select a role"
                  searchable
                  data={Object.values(Role).map((role) => ({
                    value: role,
                    label: role === "USER" ? "MANAGER" : role,
                  }))}
                  error={errors.role?.message}
                  required
                />
              )}
            />
          </Stack>
        </Grid.Col>
      </Grid>
      <Group justify="right" mt="lg">
        <Button type="submit" loading={isPending}>
          Submit
        </Button>
      </Group>
    </form>
  );
};

export default AccountFormEdit;
