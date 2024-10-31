import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { FC } from "react";

interface BastSectionPersonsProps {
  name: string;
  department: string;
}

const BastSectionPerson: FC<BastSectionPersonsProps> = ({
  name,
  department,
}) => {
  const styles = StyleSheet.create({
    text: { fontSize: 12, margin: 4 },
    textBold: { fontSize: 12, margin: 4, fontFamily: "Times-Bold" },
    flex: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  });

  return (
    <View>
      <View style={styles.flex}>
        <Text style={styles.text}>Nama :</Text>
        <Text style={styles.textBold}>{name}</Text>
      </View>
      <View style={styles.flex}>
        <Text style={styles.text}>Divisi :</Text>
        <Text style={styles.textBold}>{department}</Text>
      </View>
    </View>
  );
};

export default BastSectionPerson;
