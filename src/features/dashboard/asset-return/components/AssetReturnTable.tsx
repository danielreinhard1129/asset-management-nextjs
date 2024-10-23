import TableDataEmpty from "@/components/TableDataEmpty";
import {
  AssetReturned,
  StatusAssetReturned,
} from "@/features/asset-return/types";
import { capitalizeFirstLetters } from "@/utils/formatters";
import { ActionIcon, Badge, Menu, rem, Table } from "@mantine/core";
import {
  IconBan,
  IconCheck,
  IconDotsVertical,
  IconLicense,
  IconSquareCheck,
} from "@tabler/icons-react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useMemo } from "react";
import useApproveAssetReturn from "../api/useApproveAssetReturn";
import useDoneAssetReturn from "../api/useDoneAssetReturn";
import useRejectAssetReturn from "../api/useRejectAssetReturn";

interface AssetReturnTableProps {
  assetReturned: AssetReturned[];
}

const AssetRequestsTableHead: FC = () => {
  return (
    <Table.Thead>
      <Table.Tr>
        <Table.Th>Date</Table.Th>
        <Table.Th>No BAST</Table.Th>
        <Table.Th>Pembuat</Table.Th>
        <Table.Th>Status</Table.Th>
        <Table.Th>Action</Table.Th>
      </Table.Tr>
    </Table.Thead>
  );
};

const AssetTableRow: FC<{
  assetReturn: AssetReturned;
  role: string;
}> = ({ assetReturn, role }) => {
  const router = useRouter();

  const statusColor = useMemo(() => {
    switch (assetReturn.status) {
      case StatusAssetReturned.DONE:
        return "green";
      case StatusAssetReturned.IN_PROGRESS:
        return "cyan";
      case StatusAssetReturned.PENDING:
        return "yellow";
      case StatusAssetReturned.REJECT:
        return "red";
      default:
        return "gray";
    }
  }, [assetReturn.status]);

  const { mutateAsync: approveAssetReturn, isPending: isPendingApprove } =
    useApproveAssetReturn(assetReturn.id);

  const { mutateAsync: rejectAssetReturn, isPending: isPendingReject } =
    useRejectAssetReturn(assetReturn.id);

  const { mutateAsync: doneAssetReturn, isPending: isPendingDone } =
    useDoneAssetReturn(assetReturn.id);

  const onClickApproveAssetReturn = async () => {
    await approveAssetReturn();
  };

  const onClickRejectAssetReturn = async () => {
    await rejectAssetReturn();
  };

  const onClickDoneAssetReturn = async () => {
    await doneAssetReturn();
  };

  return (
    <Table.Tr>
      <Table.Td>{format(assetReturn.createdAt, "dd MMM yyyy")}</Table.Td>
      <Table.Td>{capitalizeFirstLetters(assetReturn.bast.bastNo)}</Table.Td>
      <Table.Td>{`${assetReturn.user.firstName} ${assetReturn.user.lastName}`}</Table.Td>
      <Table.Td>
        <Badge color={statusColor}>{assetReturn.status}</Badge>
      </Table.Td>
      <Table.Td>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon aria-label="filter" variant="light">
              <IconDotsVertical size="20px" />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            {/* <Menu.Item
              onClick={() => {
                setSelectedAssetRequest(assetRequest);
                openModalAssetRequestDetail();
              }}
              leftSection={
                <IconInfoCircle style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Detail
            </Menu.Item> */}
            {/* {role === "ADMIN" && assetRequest.bast.hrId && (
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
            )} */}

            {role === "HR" && (
              <Menu.Item
                disabled={!!assetReturn.bast.hrId}
                onClick={onClickApproveAssetReturn}
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
              disabled={["DONE", "REJECT"].includes(assetReturn.status)}
              onClick={onClickRejectAssetReturn}
              leftSection={
                <IconBan style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Reject
            </Menu.Item>
            {role === "ADMIN" && assetReturn.bast.hrId && (
              <Menu.Item
                disabled={assetReturn.bast.isCheckedByAdmin}
                onClick={onClickDoneAssetReturn}
                leftSection={
                  <IconCheck style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Done
              </Menu.Item>
            )}
            {assetReturn.status === "DONE" &&
              assetReturn.bast.isCheckedByAdmin && (
                <Menu.Item
                  onClick={() =>
                    router.push(`/dashboard/bast/${assetReturn.bast.bastNo}`)
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

const AssetReturnTable: FC<AssetReturnTableProps> = ({ assetReturned }) => {
  const { data } = useSession();

  return (
    <Table
      highlightOnHover={!!assetReturned.length}
      verticalSpacing="md"
      withTableBorder
      striped
    >
      <AssetRequestsTableHead />
      <Table.Tbody>
        {!assetReturned.length && <TableDataEmpty colSpan={5} />}
        {assetReturned.map((assetReturn, index) => (
          <AssetTableRow
            key={index}
            role={data?.user.role || ""}
            assetReturn={assetReturn}
          />
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default AssetReturnTable;
