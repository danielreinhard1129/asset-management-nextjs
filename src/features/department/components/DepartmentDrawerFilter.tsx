import { locations } from "@/constants/locations";
import { sortOrder } from "@/constants/sort-order";
import { Drawer, Select, Stack } from "@mantine/core";
import { FC } from "react";

interface DepartmentDrawerFilterProps {
  opened: boolean;
  close: () => void;
  setLocation: (value: string) => void;
  setSortOrder: (value: "asc" | "desc") => void;
}

const DepartmentDrawerFilter: FC<DepartmentDrawerFilterProps> = ({
  opened,
  close,
  setLocation,
  setSortOrder,
}) => {
  return (
    <Drawer opened={opened} onClose={close} title="Filters" position="right">
      <Stack gap="lg">
        <Select
          label="Sort By"
          placeholder="Pick value"
          data={sortOrder}
          onChange={(value) =>
            setSortOrder(value !== null ? (value as "asc" | "desc") : "desc")
          }
        />
        <Select
          label="Locations"
          placeholder="Pick value"
          onChange={(value) => setLocation(value !== null ? value : "")}
          data={locations}
        />
      </Stack>
    </Drawer>
  );
};

export default DepartmentDrawerFilter;
