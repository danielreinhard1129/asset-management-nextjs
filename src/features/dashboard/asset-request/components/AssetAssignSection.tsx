import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import useGetAssets from "../../asset/api/useGetAssets";
import { Status } from "../../asset/types";
import useAssignAsset from "../api/useAssignAsset";
import { AssignAssetSchemaType } from "../schemas";

interface AssetAssignSection {
  assetRequestId: number;
}

const AssetAssignSection: FC<AssetAssignSection> = ({ assetRequestId }) => {
  const { control, handleSubmit, setValue, watch } =
    useForm<AssignAssetSchemaType>({
      defaultValues: {
        bastItems: [
          { assetId: 0 },
          { assetId: 0 },
          { assetId: 0 },
          { assetId: 0 },
        ],
      },
      mode: "onChange",
    });

  const { fields, append, remove } = useFieldArray({
    name: "bastItems",
    control,
  });

  const { data: assets, isPending } = useGetAssets({
    status: Status.AVAILABLE,
    all: true,
  });

  const { mutateAsync: assignAsset, isPending: isPendingAssignAsset } =
    useAssignAsset();

  const onSubmit = ({ bastItems }: AssignAssetSchemaType) => {
    assignAsset({ bastItems, assetRequestId });
  };

  return (
    <Box>
      <Flex justify="space-between" align="center">
        <Text fw="bolder" fz="sm">
          Assign Asset
        </Text>
        <ActionIcon
          type="button"
          size="input-sm"
          onClick={() => append({ assetId: 0 })}
          variant="light"
          color="blue"
          disabled={!assets}
        >
          <IconPlus />
        </ActionIcon>
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack mt="lg">
          {assets &&
            fields.map((field, index) => {
              return (
                <Flex key={field.id} gap="md" align="center">
                  <Select
                    w="100%"
                    searchable
                    disabled={isPending || !assets}
                    data={assets.data.map((asset) => ({
                      value: String(asset.id),
                      label: `${asset.name} - ${asset.serial} `,
                    }))}
                    onChange={(value) =>
                      setValue(`bastItems.${index}.assetId`, Number(value))
                    }
                  />

                  <Flex gap="sm">
                    <ActionIcon
                      type="button"
                      size="input-sm"
                      onClick={() => remove(index)}
                      variant="light"
                    >
                      <IconTrash />
                    </ActionIcon>
                  </Flex>
                </Flex>
              );
            })}
        </Stack>
        <Group justify="right" mt="lg">
          <Button
            type="submit"
            fullWidth={false}
            disabled={!watch("bastItems").length}
            loading={isPendingAssignAsset}
          >
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default AssetAssignSection;
