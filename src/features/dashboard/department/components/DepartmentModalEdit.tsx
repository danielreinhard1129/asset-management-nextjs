import { locations } from "@/constants/locations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, Select, Stack, TextInput } from "@mantine/core";
import { FC } from "react";
import { useForm } from "react-hook-form";
import useUpdateDepartment from "../api/useUpdateDepartment";
import { UpdateDepartmentSchema, UpdateDepartmentSchemaType } from "../schemas";
import { Department } from "../types";

interface DepartmentModalEditProps {
  department: Department | null;
  opened: boolean;
  close: () => void;
}

const DepartmentModalEdit: FC<DepartmentModalEditProps> = ({
  department,
  opened,
  close,
}) => {
  if (!department) return;

  const {
    register,
    reset,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UpdateDepartmentSchemaType>({
    resolver: zodResolver(UpdateDepartmentSchema),
    values: {
      name: department.name,
      address: department.address,
    },
  });

  const { mutateAsync: updateDepartment, isPending } = useUpdateDepartment(
    department.id
  );

  return (
    <Modal
      opened={opened}
      onClose={() => {
        close();
        reset({
          name: department.name,
          address: department.address,
        });
      }}
      title="Create Department"
      centered
    >
      <form
        onSubmit={handleSubmit(async (values) => {
          await updateDepartment(values);
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
            defaultValue={getValues("address").toLowerCase()}
            data={locations}
            error={errors.address?.message}
          />
          <Button type="submit" disabled={isPending}>
            Save
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default DepartmentModalEdit;
