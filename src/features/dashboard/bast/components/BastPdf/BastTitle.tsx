import { Font, StyleSheet, Text, View } from "@react-pdf/renderer";
import { FC } from "react";

interface BastTitleProps {
  title: string;
  bastNo: string;
  type: string;
}

const BastTitle: FC<BastTitleProps> = ({ title, bastNo, type }) => {
  const styles = StyleSheet.create({
    header: {
      fontSize: 16,
      textAlign: "center",
      color: "black",
      fontFamily: "Oswald",
    },
  });

  Font.register({
    family: "Oswald",
    src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
  });

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.header} fixed>
        {title}
      </Text>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          gap: 10,
          fontSize: "10",
          textAlign: "center",
          color: "black",
          fontFamily: "Oswald",
        }}
      >
        <Text>No : {bastNo}</Text>
        <Text>|</Text>
        <Text>Type : {type}</Text>
      </View>
    </View>
  );
};

export default BastTitle;
