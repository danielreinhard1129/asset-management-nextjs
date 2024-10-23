"use client";

import DashboardEmpty from "@/components/DashboardEmpty";
import DashboardLoader from "@/components/DashboardLoader";
import { StatusAssetRequest } from "@/features/asset-request/types";
import { StatusAssetReturned } from "@/features/asset-return/types";
import { TypeBast } from "@/features/bast/types";
import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { FC } from "react";
import useGetBastByBastNo from "../../api/useGetBastByBastNo";
import BastSectionPerson from "./BastSectionPerson";
import BastSignUsers from "./BastSignUsers";
import BastTable from "./BastTable";
import BastTextDivider from "./BastTextDivider";
import BastTitle from "./BastTitle";

interface BastPdfProps {
  bastNo: string;
}

const BastPdf: FC<BastPdfProps> = ({ bastNo }) => {
  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
      fontFamily: "Times-Roman",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      height: "86vh",
      justifyContent: "space-between",
    },
  });

  const { data: bast, isPending } = useGetBastByBastNo(bastNo);

  if (isPending) {
    return <DashboardLoader h="40vh" />;
  }

  if (!bast) {
    return <DashboardEmpty message="No Data" h="40vh" />;
  }

  if (bast.type === TypeBast.REQUEST) {
    if (bast.assetRequests[0].status !== StatusAssetRequest.APPROVE) {
      return <DashboardEmpty message="No Data" h="40vh" />;
    }
  } else {
    if (bast.assetReturned[0].status !== StatusAssetReturned.DONE) {
      return <DashboardEmpty message="No Data" h="40vh" />;
    }
  }

  return (
    <PDFViewer width="100%" height="100%">
      <Document title={bast.bastNo}>
        <Page size="A4" style={styles.body}>
          <View style={styles.container}>
            <View>
              <BastTitle
                title="BERITA ACARA SERAH TERIMA ASET"
                bastNo={bastNo}
                type={bast.type}
              />
              <BastTextDivider
                text={`Pada hari ini ${format(
                  bast.createdAt,
                  "dd MMM yyyy"
                )}, Saya yang bertandatangan dibawah ini :`}
              />

              {bast.type === TypeBast.REQUEST ? (
                <BastSectionPerson
                  name={`${bast.admin?.firstName} ${bast.admin?.lastName}`}
                  department={`${bast.admin?.department.name} - ${bast.admin?.department.address}`}
                />
              ) : (
                <BastSectionPerson
                  name={`${bast.assetReturned[0].user.firstName} ${bast.assetReturned[0].user.lastName}`}
                  department={`${bast.assetReturned[0].user.department.name} - ${bast.assetReturned[0].user.department.address}`}
                />
              )}

              <BastTextDivider text="Disebut sebagai Pihak Pertama, menyerahkan kepada :" />

              {bast.type === TypeBast.REQUEST ? (
                <BastSectionPerson
                  name={`${bast.assetRequests[0].user.firstName} ${bast.assetRequests[0].user.lastName}`}
                  department={`${bast.assetRequests[0].user.department.name} - ${bast.assetRequests[0].user.department.address}`}
                />
              ) : (
                <BastSectionPerson
                  name={`${bast.admin?.firstName} ${bast.admin?.lastName}`}
                  department={`${bast.admin?.department.name} - ${bast.admin?.department.address}`}
                />
              )}

              <BastTextDivider text="Bahwa Pihak Pertama, telah menyerahkan aset berupa :" />
              <BastTable bastItems={bast.bastItems} />
              <BastTextDivider text="Demikian Berita Acara Serah Terima Aset ini dibuat, untuk dipergunakan sebagaimana mestinya." />
            </View>

            {bast.type === TypeBast.REQUEST ? (
              <BastSignUsers
                adminName={`${bast.admin?.firstName} ${bast.admin?.lastName}`}
                hrName={`${bast.hr?.firstName} ${bast.hr?.lastName}`}
                managerName={`${bast.assetRequests[0].user.firstName} ${bast.assetRequests[0].user.lastName}`}
                departmentName={`${bast.assetRequests[0].user.department.name}`}
                type={TypeBast.REQUEST}
              />
            ) : (
              <BastSignUsers
                adminName={`${bast.admin?.firstName} ${bast.admin?.lastName}`}
                hrName={`${bast.hr?.firstName} ${bast.hr?.lastName}`}
                managerName={`${bast.assetReturned[0].user.firstName} ${bast.assetReturned[0].user.lastName}`}
                departmentName={`${bast.assetReturned[0].user.department.name}`}
                type={TypeBast.RETURN}
              />
            )}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default BastPdf;
