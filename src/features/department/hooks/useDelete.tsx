"use client";

import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import useDeleteDepartment from "../api/useDeleteDepartment";
import { Department } from "../types";

const useDelete = () => {
  const { mutateAsync: deleteDepartment } = useDeleteDepartment();

  const openDeleteModal = (department: Department) => {
    modals.openConfirmModal({
      title: `Delete ${department.name} - ${department.address}`,
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete department {department.name} ? This
          action is destructive and you will have to contact support to restore
          your data.
        </Text>
      ),
      labels: { confirm: "Save", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        deleteDepartment(department.id);
      },
    });
  };

  return { openDeleteModal };
};

export default useDelete;
