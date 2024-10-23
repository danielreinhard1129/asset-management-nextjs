import { TypeBast } from "@/features/bast/types";
import { Font, StyleSheet, Text, View } from "@react-pdf/renderer";
import { FC } from "react";

interface BastSignUsersProps {
  adminName?: string;
  hrName?: string;
  managerName?: string;
  departmentName?: string;
  type: TypeBast;
}

const BastSignUsers: FC<BastSignUsersProps> = ({
  adminName,
  hrName,
  managerName,
  departmentName,
  type,
}) => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      fontSize: 12,
      fontFamily: "Helvetica-Oblique",
    },
    signContainer: {
      width: "140px",
      height: "120px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "center",
    },
    sign: {
      fontSize: 20,
      fontFamily: "Great-Vibes",
    },
    signNameContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  });

  Font.register({
    family: "Great-Vibes",
    src: "http://fonts.gstatic.com/s/greatvibes/v4/6q1c0ofG6NKsEhAc2eh-3Z0EAVxt0G0biEntp43Qt6E.ttf",
  });

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.signContainer}>
          <Text>Pihak Pertama</Text>
          {type === TypeBast.REQUEST ? (
            <>
              {adminName && (
                <>
                  <Text style={styles.sign}>{adminName}</Text>
                  <View style={styles.signNameContainer}>
                    <Text>{adminName}</Text>
                    <Text>Admin</Text>
                  </View>
                </>
              )}
            </>
          ) : (
            <>
              {managerName && (
                <>
                  <Text style={styles.sign}>{managerName}</Text>
                  <View style={styles.signNameContainer}>
                    <Text>{managerName}</Text>
                    <Text>{departmentName}</Text>
                  </View>
                </>
              )}
            </>
          )}
        </View>
      </View>
      <View>
        <View style={styles.signContainer}>
          <Text>Mengetahui</Text>
          {hrName && (
            <>
              <Text style={styles.sign}>{hrName}</Text>
              <View style={styles.signNameContainer}>
                <Text>{hrName}</Text>
                <Text>HR</Text>
              </View>
            </>
          )}
        </View>
      </View>
      <View>
        <View style={styles.signContainer}>
          <Text>Pihak Kedua</Text>
          {type === TypeBast.REQUEST ? (
            <>
              {managerName && (
                <>
                  <Text style={styles.sign}>{managerName}</Text>
                  <View style={styles.signNameContainer}>
                    <Text>{managerName}</Text>
                    <Text>{departmentName}</Text>
                  </View>
                </>
              )}
            </>
          ) : (
            <>
              {adminName && (
                <>
                  <Text style={styles.sign}>{adminName}</Text>
                  <View style={styles.signNameContainer}>
                    <Text>{adminName}</Text>
                    <Text>Admin</Text>
                  </View>
                </>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default BastSignUsers;
