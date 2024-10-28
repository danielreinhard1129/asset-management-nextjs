import { Font, StyleSheet, Text, View } from "@react-pdf/renderer";
import { FC, useCallback, useEffect } from "react";
const Oswald = require("./fonts/Oswald.ttf");

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
    src: Oswald,
    format: "truetype",
    // src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
  });

  const loadFonts = useCallback(async () => {
    await Promise.all([Font.load({ fontFamily: "Oswald" })]);
  }, []);

  useEffect(() => {
    loadFonts();
  }, [loadFonts]);

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
