"use client";

import { Bast } from "@/features/bast/types";
import { PDFViewer } from "@react-pdf/renderer";
import { FC } from "react";
import BastPdf from "../../../../components/BastPdf";

interface BastPdfViewerProps {
  bast: Bast;
}

const BastPdfViewer: FC<BastPdfViewerProps> = ({ bast }) => {
  return (
    <PDFViewer width="100%" height="100%">
      <BastPdf bast={bast} />
    </PDFViewer>
  );
};

export default BastPdfViewer;
