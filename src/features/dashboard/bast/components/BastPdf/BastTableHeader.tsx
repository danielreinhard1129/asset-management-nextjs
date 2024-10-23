import { StyleSheet, Text, View } from "@react-pdf/renderer";

const BastTableHeader = () => {
  const borderColor = "black";
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      borderBottomColor: "black",
      borderBottomWidth: 1,
      alignItems: "center",
      height: 24,
      textAlign: "center",
      fontStyle: "bold",
      flexGrow: 1,
      fontSize: 12,
    },
    no: {
      width: "10%",
      borderRightColor: borderColor,
      borderRightWidth: 1,
    },
    name: {
      width: "40%",
      borderRightColor: borderColor,
      borderRightWidth: 1,
    },
    tag: {
      width: "25%",
      borderRightColor: borderColor,
      borderRightWidth: 1,
    },
    serial: {
      width: "25%",
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.no}>No</Text>
      <Text style={styles.name}>Name</Text>
      <Text style={styles.tag}>Tag</Text>
      <Text style={styles.serial}>Serial</Text>
    </View>
  );
};

export default BastTableHeader;
