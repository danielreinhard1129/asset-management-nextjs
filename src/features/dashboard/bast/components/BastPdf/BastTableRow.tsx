import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { FC } from "react";

interface BastTableRowProps {
  no: number;
  name: string;
  tag: string;
  serial: string;
}

const BastTableRow: FC<BastTableRowProps> = ({ no, name, tag, serial }) => {
  const borderColor = "black";
  const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      borderBottomColor: "black",
      borderBottomWidth: 1,
      alignItems: "center",
      height: 24,
      fontStyle: "bold",
      fontSize: 12,
    },
    no: {
      width: "10%",
      textAlign: "center",
      borderRightColor: borderColor,
      borderRightWidth: 1,
      paddingLeft: 8,
    },
    name: {
      width: "40%",
      borderRightColor: borderColor,
      borderRightWidth: 1,
      textAlign: "center",
      paddingRight: 8,
    },
    tag: {
      width: "25%",
      borderRightColor: borderColor,
      borderRightWidth: 1,
      textAlign: "center",
      paddingRight: 8,
    },
    serial: {
      width: "25%",
      textAlign: "center",
      paddingRight: 8,
    },
  });
  return (
    <View style={styles.row}>
      <Text style={styles.no}>{no}</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.tag}>{tag}</Text>
      <Text style={styles.serial}>{serial}</Text>
    </View>
  );
};

export default BastTableRow;
