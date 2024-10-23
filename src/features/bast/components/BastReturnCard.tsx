import { Asset } from "@/features/asset/types";
import { Checkbox, Flex, Image, Text } from "@mantine/core";
import React, { FC, useState } from "react";

interface BastReturnCardProps {
  asset: Asset;
  onToggle: (assetId: number, isChecked: boolean) => void;
}

const BastReturnCard: FC<BastReturnCardProps> = ({ asset, onToggle }) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    onToggle(asset.id, isChecked);
  };
  return (
    <Flex
      justify="space-between"
      p="md"
      style={{ border: "1px solid lightgray", borderRadius: "4px" }}
    >
      <Flex align="center" gap="md">
        <Image radius="xs" h="50px" w="80px" fit="cover" src={asset.image} />
        <Flex direction="column">
          <Text fw="bold" fz="sm">
            {asset.name}
          </Text>
          <Text fz="sm">{asset.serial}</Text>
        </Flex>
      </Flex>
      <Flex align="center" gap="xs">
        <Checkbox checked={checked} onChange={handleCheckboxChange} />
      </Flex>
    </Flex>
  );
};

export default BastReturnCard;
