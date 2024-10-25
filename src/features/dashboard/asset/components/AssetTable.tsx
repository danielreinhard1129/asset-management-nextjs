import ModalQRCode from "@/components/ModalQRCode";
import TableDataEmpty from "@/components/TableDataEmpty";
import { Asset } from "@/features/asset/types";
import { capitalizeFirstLetters } from "@/utils/formatters";
import {
  ActionIcon,
  Badge,
  Image,
  Menu,
  rem,
  Table,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBarcode,
  IconDotsVertical,
  IconEdit,
  IconInfoCircle,
  IconTrash,
} from "@tabler/icons-react";
import { FC, useMemo, useState } from "react";
import { Status } from "../types";
import { modals } from "@mantine/modals";
import useDeleteAsset from "../api/useDeleteAsset";
import AssetDetailModal from "./AssetDetailModal";
import { useRouter } from "next/navigation";

interface AssetTableProps {
  assets: Asset[];
}

const AssetTableHead: FC = () => {
  return (
    <Table.Thead>
      <Table.Tr>
        <Table.Th>Image</Table.Th>
        <Table.Th>Name</Table.Th>
        <Table.Th>Tag</Table.Th>
        <Table.Th>Serial</Table.Th>
        <Table.Th>Status</Table.Th>
        <Table.Th>Action</Table.Th>
      </Table.Tr>
    </Table.Thead>
  );
};

const AssetTableRow: FC<{
  asset: Asset;
  openQr: () => void;
  openDetail: () => void;
  setSelectedAssetId: (id: string) => void;
  setTitle: (value: string) => void;
  openDeleteAssetModal: (assetId: number) => void;
  setSelectedAssetDetail: (asset: Asset) => void;
}> = ({
  asset,
  openQr,
  openDetail,
  setSelectedAssetId,
  setTitle,
  openDeleteAssetModal,
  setSelectedAssetDetail,
}) => {
  const router = useRouter();

  const statusColor = useMemo(() => {
    switch (asset.status) {
      case Status.AVAILABLE:
        return "green";
      case Status.IN_PROGRESS:
        return "cyan";
      case Status.BROKEN:
        return "red";
      case Status.IN_USE:
        return "blue";
      case Status.MAINTENANCE:
        return "orange";
      case Status.MISSING:
        return "red";
      case Status.RETIRED:
        return "gray";
      default:
        return "gray";
    }
  }, [asset.status]);

  return (
    <Table.Tr>
      <Table.Td>
        <Image
          w="100px"
          h="72px"
          src={asset.image}
          alt="image"
          fit="cover"
          radius="xs"
        />
      </Table.Td>
      <Table.Td>{capitalizeFirstLetters(asset.name)}</Table.Td>
      <Table.Td>{capitalizeFirstLetters(asset.tag)}</Table.Td>
      <Table.Td>{asset.serial}</Table.Td>
      <Table.Td>
        <Badge color={statusColor}>{asset.status}</Badge>
      </Table.Td>
      <Table.Td>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon aria-label="filter" variant="light">
              <IconDotsVertical size="20px" />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              onClick={() => {
                setSelectedAssetId(String(asset.id));
                setTitle(`${asset.name}-${asset.serial}`);
                openQr();
              }}
              leftSection={
                <IconBarcode style={{ width: rem(14), height: rem(14) }} />
              }
            >
              QR Code
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                setSelectedAssetDetail(asset);
                openDetail();
              }}
              leftSection={
                <IconInfoCircle style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Detail
            </Menu.Item>
            <Menu.Item
              onClick={() => router.push(`/dashboard/assets/${asset.id}/edit`)}
              leftSection={
                <IconEdit style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Edit
            </Menu.Item>
            <Menu.Item
              onClick={() => openDeleteAssetModal(asset.id)}
              leftSection={
                <IconTrash style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  );
};

const AssetTable: FC<AssetTableProps> = ({ assets }) => {
  const [openedQr, { open: openQr, close: closeQr }] = useDisclosure(false);
  const [openedDetail, { open: openDetail, close: closeDetail }] =
    useDisclosure(false);
  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [title, setTitle] = useState("");
  const [selectedAssetDetail, setSelectedAssetDetail] = useState<Asset | null>(
    null
  );

  const clearValue = () => {
    setSelectedAssetId("");
    setTitle("");
  };

  const { mutateAsync: deleteAsset } = useDeleteAsset();

  const openDeleteAssetModal = (assetId: number) => {
    modals.openConfirmModal({
      title: `Delete Asset`,
      centered: true,
      children: (
        <Text size="sm">Please click one of these buttons to proceed.</Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        deleteAsset(assetId);
      },
    });
  };

  return (
    <Table
      highlightOnHover={!!assets.length}
      verticalSpacing="md"
      withTableBorder
      striped
    >
      <AssetTableHead />
      <Table.Tbody>
        {!assets.length && <TableDataEmpty colSpan={6} />}
        {assets.map((asset, index) => (
          <AssetTableRow
            key={index}
            asset={asset}
            openQr={openQr}
            openDetail={openDetail}
            setSelectedAssetId={setSelectedAssetId}
            setTitle={setTitle}
            openDeleteAssetModal={openDeleteAssetModal}
            setSelectedAssetDetail={setSelectedAssetDetail}
          />
        ))}
      </Table.Tbody>
      <ModalQRCode
        opened={openedQr}
        title={title}
        value={selectedAssetId}
        close={closeQr}
        clearValue={clearValue}
      />
      <AssetDetailModal
        opened={openedDetail}
        close={closeDetail}
        asset={selectedAssetDetail}
      />
    </Table>
  );
};

export default AssetTable;
