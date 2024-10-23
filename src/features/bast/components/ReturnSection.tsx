import { Asset } from "@/features/asset/types";
import { Box, Button, Stack, Text } from "@mantine/core";
import { FC, useState } from "react";
import BastReturnCard from "./BastReturnCard";
import { useCreateAssetReturnMutation } from "@/features/asset-return/api/useCreateAssetReturn";
import { modals } from "@mantine/modals";

interface ReturnSectionProps {
  assets: Asset[];
}

const ReturnSection: FC<ReturnSectionProps> = ({ assets }) => {
  const [assetCart, setAssetCart] = useState<{ assetId: number }[]>([]);

  const { mutateAsync: createAssetReturn, isPending } =
    useCreateAssetReturnMutation();

  const handleAssetToggle = (assetId: number, isChecked: boolean) => {
    if (isChecked) {
      setAssetCart((prev) => [...prev, { assetId }]);
    } else {
      setAssetCart((prev) => prev.filter((item) => item.assetId !== assetId));
    }
  };

  const openConfirmCreateAssetReturnModal = () => {
    modals.openConfirmModal({
      title: `Confirm Create Asset Return `,
      centered: true,
      children: (
        <Text size="sm">Please click one of these buttons to proceed.</Text>
      ),
      labels: { confirm: "Submit", cancel: "Cancel" },
      onConfirm: async () => {
        if (!!assetCart.length) {
          await createAssetReturn({ items: assetCart });
          setAssetCart([]);
        }
      },
    });
  };

  return (
    <Box>
      <Stack mt="md" pb="64px" gap="sm">
        {assets.map((asset) => (
          <BastReturnCard
            key={asset.id}
            asset={asset}
            onToggle={handleAssetToggle}
          />
        ))}
      </Stack>

      <Box pos="absolute" left={0} bottom={0} w="100%">
        <Button
          mt="lg"
          type="submit"
          fullWidth
          disabled={!assetCart.length}
          loading={isPending}
          onClick={openConfirmCreateAssetReturnModal}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default ReturnSection;
