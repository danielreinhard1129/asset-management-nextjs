import { Button, Flex, Image, Text } from "@mantine/core";
import { FC } from "react";

interface BastRequestCardProps {
  id: number;
  name: string;
  image: string;
  assetCategoryRequestCart: { id: number; qty: number }[];
  handleAddToCart: (id: number) => void;
  handleRemoveFromCart: (id: number) => void;
}

const BastRequestCard: FC<BastRequestCardProps> = ({
  id,
  image,
  name,
  assetCategoryRequestCart,
  handleAddToCart,
  handleRemoveFromCart,
}) => {
  const cartItem = assetCategoryRequestCart.find((item) => item.id === id);
  const quantity = cartItem ? cartItem.qty : 0;

  return (
    <Flex
      justify="space-between"
      p="md"
      style={{ border: "1px solid lightgray", borderRadius: "4px" }}
    >
      <Flex align="center" gap="md">
        <Image radius="xs" h="50px" w="80px" fit="cover" src={image} />
        <Text fw="bold" fz="sm">
          {name}
        </Text>
      </Flex>
      <Flex align="center" gap="xs">
        <Button
          disabled={!quantity}
          size="compact-xs"
          style={{ borderRadius: "100%" }}
          onClick={() => handleRemoveFromCart(id)}
        >
          -
        </Button>
        <Text>{quantity}</Text>
        <Button
          size="compact-xs"
          style={{ borderRadius: "100%" }}
          onClick={() => handleAddToCart(id)}
        >
          +
        </Button>
      </Flex>
    </Flex>
  );
};

export default BastRequestCard;
