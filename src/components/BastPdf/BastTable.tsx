import { StyleSheet, View } from "@react-pdf/renderer";
import BastTableHeader from "./BastTableHeader";
import BastTableRow from "./BastTableRow";
import { BastItem } from "@/features/bast/types";
import { FC } from "react";

interface BastTableProps {
  bastItems: BastItem[];
}

const BastTable: FC<BastTableProps> = ({ bastItems }) => {
  const styles = StyleSheet.create({
    tableContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 12,
      borderWidth: 1,
      borderColor: "black",
    },
  });
  return (
    <View style={styles.tableContainer}>
      <BastTableHeader />

      {bastItems.map((item, idx) => (
        <BastTableRow
          key={idx}
          no={idx + 1}
          name={item.asset.name}
          tag={item.asset.tag}
          serial={item.asset.serial}
        />
      ))}
    </View>
  );
};

export default BastTable;
