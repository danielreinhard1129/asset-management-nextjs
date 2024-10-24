"use client";

import { Button, Image, Modal, Text } from "@mantine/core";
import { FC, useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import DashboardLoader from "./DashboardLoader";

interface ModalQRCodeProps {
  title: string;
  value: string;
  opened: boolean;
  close: () => void;
  clearValue: () => void;
}

const ModalQRCode: FC<ModalQRCodeProps> = ({
  title,
  value,
  opened,
  close,
  clearValue,
}) => {
  const [qrCodeUrl, setQRCodeUrl] = useState("");
  const [error, setError] = useState("");

  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (value) {
      const generateQRCode = async () => {
        try {
          const url = await QRCode.toDataURL(value);
          setQRCodeUrl(url);
        } catch (err) {
          setError("Something went wrong!");
        }
      };

      generateQRCode();
    }
  }, [value]);

  const handleDownload = () => {
    if (downloadLinkRef.current) {
      downloadLinkRef.current.click();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        close();
        clearValue();
      }}
      title="QR Code"
      aria-labelledby="modal-qrcode"
      aria-modal="true"
    >
      {qrCodeUrl ? (
        <>
          <Image src={qrCodeUrl} alt="QR Code" />
          <br />
          <a
            href={qrCodeUrl}
            download={`${title}-qrcode.png`}
            ref={downloadLinkRef}
            style={{ display: "none" }}
          >
            Download QR Code
          </a>
          <Button fullWidth onClick={handleDownload}>
            Download
          </Button>
        </>
      ) : !!error ? (
        <Text ta="center">{error}</Text>
      ) : (
        <DashboardLoader h="15vh" />
      )}
    </Modal>
  );
};

export default ModalQRCode;
