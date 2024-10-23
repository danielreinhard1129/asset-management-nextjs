import AssetCard from "@/features/home/components/AssetCard";
import { Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Asset } from "../types";

interface BodyProps {
  assets: Asset[];
}

const AssetListBody: FC<BodyProps> = ({ assets }) => {
  const router = useRouter();

  const onClickAssetCard = (assetId: number) => {
    router.push(`/assets/${assetId}`);
  };

  return (
    <Stack>
      <Text fw="bold" fz="xl">
        All Assets
      </Text>
      <Stack>
        {assets.map((asset, idx) => (
          <AssetCard key={idx} asset={asset} onClick={onClickAssetCard} />
        ))}
      </Stack>
    </Stack>
  );
};

export default AssetListBody;
