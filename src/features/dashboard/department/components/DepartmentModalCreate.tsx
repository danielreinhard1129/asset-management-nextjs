"use client";

import { locations } from "@/constants/locations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, Select, Stack, TextInput } from "@mantine/core";
import { FC } from "react";
import { useForm } from "react-hook-form";
import useCreateDepartment from "../api/useCreateDepartment";
import { CreateDepartmentSchema, CreateDepartmentSchemaType } from "../schemas";

interface DepartmentModalCreateProps {
  opened: boolean;
  close: () => void;
}

const DepartmentModalCreate: FC<DepartmentModalCreateProps> = ({
  opened,
  close,
}) => {
  const {
    register,
    reset,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDepartmentSchemaType>({
    resolver: zodResolver(CreateDepartmentSchema),
  });

  const { mutateAsync: createDepartment, isPending } = useCreateDepartment();

  return (
    <Modal opened={opened} onClose={close} title="Create Department" centered>
      <form
        onSubmit={handleSubmit(async (values) => {
          await createDepartment(values);
          reset();
          close();
        })}
      >
        <Stack>
          <TextInput
            label="Name"
            placeholder="Name"
            {...register("name")}
            error={errors.name?.message}
          />

          <Select
            label="Locations"
            placeholder="Pick value"
            onChange={(value) => {
              if (value) {
                setValue("address", value);
                clearErrors("address");
              } else {
                setValue("address", "");
                setError("address", { type: "required", message: "Required" });
              }
            }}
            data={locations}
            error={errors.address?.message}
          />
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default DepartmentModalCreate;
