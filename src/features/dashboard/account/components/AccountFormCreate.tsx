"use client";

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
import { Controller, useForm } from "react-hook-form";
import { CreateAccountSchema, CreateAccountSchemaType } from "../schemas";
import { Role } from "@/features/user/types";
import useGetDepartments from "../../department/api/useGetDepartments";
import useCreateAccount from "../api/useCreateAccount";

const AccountFormCreate = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateAccountSchemaType>({
    resolver: zodResolver(CreateAccountSchema),
  });

  const { data: departments } = useGetDepartments({ all: true });

  const { mutateAsync: createAccount, isPending } = useCreateAccount();

  const onSubmit = async (data: CreateAccountSchemaType) => {
    await createAccount({ ...data, departmentId: Number(data.departmentId) });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

export default AccountFormCreate;
