import { useState } from "react";

const useAssetCategoryRequestCart = () => {
  const [assetCategoryRequestCart, setAssetCategoryRequestCart] = useState<
    { id: number; qty: number }[]
  >([]);

  const handleAddToCart = (id: number) => {
    setAssetCategoryRequestCart((prevCart) => {
      const item = prevCart.find((item) => item.id === id);
      if (item) {
        return prevCart.map((cartItem) =>
          cartItem.id === id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
        );
      } else {
        return [...prevCart, { id, qty: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setAssetCategoryRequestCart((prevCart) => {
      const item = prevCart.find((item) => item.id === id);
      if (item) {
        if (item.qty > 1) {
          return prevCart.map((cartItem) =>
            cartItem.id === id
              ? { ...cartItem, qty: cartItem.qty - 1 }
              : cartItem
          );
        } else {
          return prevCart.filter((cartItem) => cartItem.id !== id);
        }
      }
      return prevCart;
    });
  };

  const handleClearCart = () => {
    setAssetCategoryRequestCart([]);
  };
  return {
    assetCategoryRequestCart,
    setAssetCategoryRequestCart,
    handleClearCart,
    handleAddToCart,
    handleRemoveFromCart,
  };
};

export default useAssetCategoryRequestCart;
