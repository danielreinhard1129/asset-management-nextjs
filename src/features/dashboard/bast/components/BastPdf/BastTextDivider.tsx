import { Text, View } from "@react-pdf/renderer";
import { FC } from "react";

interface BastTextDividerProps {
  text: string;
}

const BastTextDivider: FC<BastTextDividerProps> = ({ text }) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 12,
          marginVertical: 16,
          marginHorizontal: 4,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default BastTextDivider;
