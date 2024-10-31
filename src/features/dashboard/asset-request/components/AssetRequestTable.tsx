import TableDataEmpty from "@/components/TableDataEmpty";
import {
  AssetRequest,
  StatusAssetRequest,
} from "@/features/asset-request/types";
import { capitalizeFirstLetters } from "@/utils/formatters";
import { ActionIcon, Badge, Menu, rem, Table } from "@mantine/core";
import {
  IconBan,
  IconCheck,
  IconClipboardPlus,
  IconDotsVertical,
  IconInfoCircle,
  IconLicense,
  IconSquareCheck,
} from "@tabler/icons-react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FC, useMemo } from "react";
import useApproveAssetRequest from "../api/useApproveAssetRequest";
import { useRouter } from "next/navigation";
import useRejectAssetRequest from "../api/useRejectAssetRequest";
import useDoneAssetRequest from "../api/useDoneAssetRequest";

interface AssetRequestTableProps {
  assetRequests: AssetRequest[];
  setSelectedAssetRequest: (value: AssetRequest) => void;
  openModalAssetRequestDetail: () => void;
}

const AssetRequestsTableHead: FC = () => {
  return (
    <Table.Thead>
      <Table.Tr>
        <Table.Th>Date</Table.Th>
        <Table.Th>No BAST</Table.Th>
        <Table.Th>Pembuat</Table.Th>
        <Table.Th>Penerima</Table.Th>
        <Table.Th>Status</Table.Th>
        <Table.Th>Action</Table.Th>
      </Table.Tr>
    </Table.Thead>
  );
};

const AssetTableRow: FC<{
  assetRequest: AssetRequest;
  role: string;
  setSelectedAssetRequest: (value: AssetRequest) => void;
  openModalAssetRequestDetail: () => void;
}> = ({
  assetRequest,
  role,
  setSelectedAssetRequest,
  openModalAssetRequestDetail,
}) => {
  const router = useRouter();

  const statusColor = useMemo(() => {
    switch (assetRequest.status) {
      case StatusAssetRequest.APPROVE:
        return "green";
      case StatusAssetRequest.IN_PROGRESS:
        return "cyan";
      case StatusAssetRequest.PENDING:
        return "yellow";
      case StatusAssetRequest.REJECT:
        return "red";
      default:
        return "gray";
    }
  }, [assetRequest.status]);

  const { mutateAsync: approveAssetRequest, isPending: isPendingApprove } =
    useApproveAssetRequest(assetRequest.id);

  const { mutateAsync: rejectAssetRequest, isPending: isPendingReject } =
    useRejectAssetRequest(assetRequest.id);

  const { mutateAsync: doneAssetRequest, isPending: isPendingDone } =
    useDoneAssetRequest(assetRequest.id);

  const onClickApproveAssetRequest = async () => {
    await approveAssetRequest();
  };

  const onClickRejectAssetRequest = async () => {
    await rejectAssetRequest();
  };

  const onClickDoneAssetRequest = async () => {
    await doneAssetRequest();
  };

  return (
    <Table.Tr>
      <Table.Td>{format(assetRequest.createdAt, "dd MMM yyyy")}</Table.Td>
      <Table.Td>{capitalizeFirstLetters(assetRequest.bast.bastNo)}</Table.Td>
      <Table.Td>{`${assetRequest.user.firstName} ${assetRequest.user.lastName}`}</Table.Td>
      <Table.Td>{assetRequest.assignToUser}</Table.Td>
      <Table.Td>
        <Badge color={statusColor}>{assetRequest.status}</Badge>
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
                setSelectedAssetRequest(assetRequest);
                openModalAssetRequestDetail();
              }}
              leftSection={
                <IconInfoCircle style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Detail
            </Menu.Item>
            {role === "ADMIN" && assetRequest.bast.hrId && (
              <Menu.Item
                disabled={!!assetRequest.bast.adminId}
                onClick={() =>
                  router.push(
                    `/dashboard/asset-requests/${assetRequest.id}/assign`
                  )
                }
                leftSection={
                  <IconClipboardPlus
                    style={{ width: rem(14), height: rem(14) }}
                  />
                }
              >
                Assign Asset
              </Menu.Item>
            )}

            {role === "HR" && (
              <Menu.Item
                disabled={!!assetRequest.bast.hrId}
                onClick={onClickApproveAssetRequest}
                leftSection={
                  <IconSquareCheck
                    style={{ width: rem(14), height: rem(14) }}
                  />
                }
              >
                Approve
              </Menu.Item>
            )}

            <Menu.Item
              disabled={assetRequest.status === "APPROVE"}
              onClick={onClickRejectAssetRequest}
              leftSection={
                <IconBan style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Reject
            </Menu.Item>
            {role === "ADMIN" && (
              <Menu.Item
                disabled={
                  !assetRequest.bast.isCheckedByUser ||
                  assetRequest.bast.isCheckedByAdmin
                }
                onClick={onClickDoneAssetRequest}
                leftSection={
                  <IconCheck style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Done
              </Menu.Item>
            )}
            {assetRequest.bast.isCheckedByAdmin &&
              assetRequest.bast.isCheckedByUser && (
                <Menu.Item
                  onClick={() =>
                    router.push(`/dashboard/bast/${assetRequest.bast.bastNo}`)
                  }
                  leftSection={
                    <IconLicense style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  BAST
                </Menu.Item>
              )}
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  );
};

const AssetRequestsTable: FC<AssetRequestTableProps> = ({
  assetRequests,
  setSelectedAssetRequest,
  openModalAssetRequestDetail,
}) => {
  const { data } = useSession();

  return (
    <Table
      highlightOnHover={!!assetRequests.length}
      verticalSpacing="md"
      withTableBorder
      striped
    >
      <AssetRequestsTableHead />
      <Table.Tbody>
        {!assetRequests.length && <TableDataEmpty colSpan={6} />}
        {assetRequests.map((assetRequest, index) => (
          <AssetTableRow
            key={index}
            role={data?.user.role || ""}
            assetRequest={assetRequest}
            setSelectedAssetRequest={setSelectedAssetRequest}
            openModalAssetRequestDetail={openModalAssetRequestDetail}
          />
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default AssetRequestsTable;
